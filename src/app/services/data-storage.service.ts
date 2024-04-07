import { Injectable, NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Section } from '../models/section.model';
import { MenuService } from './menu.service';
import { map, take, exhaustMap } from 'rxjs/operators';
import { LoginService } from './login.service';
import { Restaurant } from '../models/restaurant.model';
import { RestaurantService } from './restaurant.service';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private menuService: MenuService,
    private loginService: LoginService,
    private restaurantService: RestaurantService
  ) {}

  storeRestaurant() {
    const restaurant = this.restaurantService.getRestaurant();
    this.loginService.user
      .pipe(
        take(1),
        exhaustMap((user) => {
          return this.http.put(
            'https://ng-course-c5335-default-rtdb.firebaseio.com/users/' +
              user?.id +
              '/restaurant.json?auth=' +
              user?.token,
            restaurant
          );
        })
      )
      .subscribe((response) => {
        console.log(response);
      });
  }
  storeMenu() {
    const sections = this.menuService.getSections();
    this.loginService.user
      .pipe(
        take(1),
        exhaustMap((user) => {
          return this.http.put(
            'https://ng-course-c5335-default-rtdb.firebaseio.com/users/' +
              user?.id +
              '/menu.json?auth=' +
              user?.token,
            sections
          );
        })
      )
      .subscribe((response) => {
        console.log(response);
      });
  }
  fetchRestaurant() {
    this.loginService.user
      .pipe(
        take(1),
        exhaustMap((user) => {
          return this.http.get<Restaurant>(
            'https://ng-course-c5335-default-rtdb.firebaseio.com/users/' +
              user?.id +
              '/restaurant.json'

            // ?auth=' +
            // user?.token
          );
        })
      )
      .subscribe((restaurant: Restaurant) => {
        console.log(restaurant);

        this.restaurantService.setRestaurant(restaurant);
      });
  }
  fetchMenu() {
    this.loginService.user
      .pipe(
        take(1),
        exhaustMap((user) => {
          return this.http.get<Section[]>(
            'https://ng-course-c5335-default-rtdb.firebaseio.com/users/' +
              user?.id +
              '/menu.json'

            // ?auth=' +
            // user?.token
          );
        }),
        map((sections: Section[]) => {
          return sections.map((section: Section) => {
            return {
              ...section,
              menuItems: section.menuItems ? section.menuItems : [],
            };
          });
        })
      )
      .subscribe((sections: Section[]) => {
        console.log(sections);

        this.menuService.setSections(sections);
      });
  }

  displayMenu(userId: string | null) {
    this.loginService.user
      .pipe(
        take(1),
        exhaustMap(() => {
          return this.http.get<Section[]>(
            'https://ng-course-c5335-default-rtdb.firebaseio.com/users/' +
              userId +
              '/menu.json'

            // ?auth=' +
            // user?.token
          );
        }),
        map((sections: Section[]) => {
          return sections.map((section: Section) => {
            return {
              ...section,
              menuItems: section.menuItems ? section.menuItems : [],
            };
          });
        })
      )
      .subscribe((sections: Section[]) => {
        console.log('Sections For View In DataStorage:');
        console.log(sections);

        this.menuService.setSectionsForView(sections);
      });
    this.loginService.user
      .pipe(
        take(1),
        exhaustMap(() => {
          return this.http.get<Restaurant>(
            'https://ng-course-c5335-default-rtdb.firebaseio.com/users/' +
              userId +
              '/restaurant.json'

            // ?auth=' +
            // user?.token
          );
        })
      )
      .subscribe((restaurant: Restaurant) => {
        console.log(restaurant);

        this.restaurantService.setRestuarantForView(restaurant);
        console.log('Restaurant For View In DataStorage:');
        console.log(restaurant);
      });
  }
}
