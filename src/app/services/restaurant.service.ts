import { Injectable } from '@angular/core';
import { Restaurant } from '../models/restaurant.model';

const EMPTY_RESTAURANT = new Restaurant('', '', '', '', '', '', '', '', '', '');

@Injectable({
  providedIn: 'root',
})
export class RestaurantService {
  constructor() {}
  restaurant = { ...EMPTY_RESTAURANT };
  setRestaurant(restaurant: Restaurant) {
    this.restaurant = restaurant;
    console.log(this.restaurant);
  }
  getRestaurant() {
    return this.restaurant;
  }
  resetRestaurant() {
    this.restaurant = { ...EMPTY_RESTAURANT };
  }
}
