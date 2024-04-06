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

  setRestaurant(restaurant: Restaurant) {
    this._restaurant.next(restaurant);
    console.log(this.restaurant$);
  }
  getRestaurant() {
    return this._restaurant.value;
  }
  resetRestaurant() {
    this._restaurant.next({ ...EMPTY_RESTAURANT });
  }
}
