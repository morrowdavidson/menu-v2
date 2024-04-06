import { Component } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Restaurant } from '../../models/restaurant.model';
import { RestaurantService } from '../../services/restaurant.service';
import { FormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MenuHeaderComponent } from '../../menu-header/menu-header.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-restaurant',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    MatButton,
    MenuHeaderComponent,
  ],
  templateUrl: './restaurant.component.html',
  styleUrl: './restaurant.component.scss',
})
export class RestaurantComponent {
  constructor(private restaurantService: RestaurantService) {}

  editRestaurantSubscription?: Subscription;
  editRestaurant: Restaurant;

  ngOnInit() {
    this.editRestaurantSubscription =
      this.restaurantService.restaurant$.subscribe(
        (restaurant) => (this.editRestaurant = restaurant)
      );
  }
  ngOnDestroy() {
    this.editRestaurantSubscription?.unsubscribe();
  }
}
