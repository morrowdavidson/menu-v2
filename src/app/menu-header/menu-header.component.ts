import { Component, Input } from '@angular/core';
import { RestaurantService } from '../services/restaurant.service';
import { Restaurant } from '../models/restaurant.model';
import { Subscription } from 'rxjs';
import { MatButton } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-menu-header',
  standalone: true,
  imports: [MatButton, MatIconModule, MatIconButton, MatButtonModule],
  templateUrl: './menu-header.component.html',
  styleUrl: './menu-header.component.scss',
})
export class MenuHeaderComponent {
  @Input() useViewSubscription: boolean = false;

  constructor(private restaurantService: RestaurantService) {}
  restaurant: Restaurant;
  restaurantSubscription?: Subscription;

  ngOnInit() {
    if (this.useViewSubscription) {
      this.restaurantSubscription =
        this.restaurantService.restaurantForView$.subscribe((restaurant) => {
          this.restaurant = restaurant;
        });
      console.log('This is the restaurant for view:');

      console.log(this.restaurant);
    } else {
      this.restaurantSubscription =
        this.restaurantService.restaurant$.subscribe((restaurant) => {
          this.restaurant = restaurant;
        });
    }
  }

  ngOnDestroy() {
    this.restaurantSubscription?.unsubscribe();
  }

  getBackgroundImageStyle() {
    return `background-image:url(${this.restaurant.featuredImgURL})`;
  }
}
