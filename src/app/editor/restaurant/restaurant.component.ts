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
import { MatCardModule } from '@angular/material/card';
import { DataStorageService } from '../../services/data-storage.service';

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
    MatCardModule,
  ],
  templateUrl: './restaurant.component.html',
  styleUrl: './restaurant.component.scss',
})
export class RestaurantComponent {
  constructor(
    private restaurantService: RestaurantService,
    private dataService: DataStorageService
  ) {}

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

  saveClicked() {
    this.dataService.storeRestaurant();
  }
}
