import { Component } from '@angular/core';
import { RestaurantService } from '../services/restaurant.service';
import { Restaurant } from '../models/restaurant.model';

@Component({
  selector: 'app-menu-header',
  standalone: true,
  imports: [],
  templateUrl: './menu-header.component.html',
  styleUrl: './menu-header.component.scss',
})
export class MenuHeaderComponent {
  constructor(private restaurantService: RestaurantService) {}
  restaurant: Restaurant;

  ngOnInit() {
    this.restaurantService.restaurant$.subscribe((restaurant) => {
      this.restaurant = restaurant;
    });
  }

  getBackgroundImageStyle() {
    return `background-image:url(${this.restaurant.featuredImgURL})`;
  }
}
