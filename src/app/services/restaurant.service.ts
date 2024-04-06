import { Injectable } from '@angular/core';
import { Restaurant } from '../models/restaurant.model';
import { BehaviorSubject } from 'rxjs';

const EMPTY_RESTAURANT = new Restaurant('', '', '', '', '', '', '', '', '', '');

@Injectable({
  providedIn: 'root',
})
export class RestaurantService {
  constructor() {}
  private _restaurant = new BehaviorSubject<Restaurant>({
    ...EMPTY_RESTAURANT,
  });
  restaurant$ = this._restaurant.asObservable();

  private _restaurantForView = new BehaviorSubject<Restaurant>({
    ...EMPTY_RESTAURANT,
  });
  restaurantForView$ = this._restaurantForView.asObservable();

  setRestaurant(restaurant: Restaurant) {
    this._restaurant.next(restaurant);
  }
  getRestaurant() {
    return this._restaurant.value;
  }
  resetRestaurant() {
    this._restaurant.next({ ...EMPTY_RESTAURANT });
  }
  setRestuarantForView(returnedRestaurant: Restaurant) {
    this._restaurantForView.next(returnedRestaurant);
    console.log('FROM RESTAURANT SERVICE:');
    console.log(this._restaurantForView);
  }
}
