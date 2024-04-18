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
import { LoginService } from '../../services/login.service';
import { User } from '../../models/user.model';
import { Router } from '@angular/router';

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
    private dataService: DataStorageService,
    private loginService: LoginService,
    private router: Router
  ) {}
  private subscriptions = new Subscription();
  isAuthenticated: boolean = false;
  user: User | null = null;

  editRestaurant: Restaurant;

  ngOnInit() {
    this.subscriptions.add(
      this.restaurantService.restaurant$.subscribe(
        (restaurant) => (this.editRestaurant = restaurant)
      )
    );
    this.subscriptions.add(
      this.loginService.user.subscribe((user) => {
        this.isAuthenticated = !!user;
        this.user = user;
      })
    );
  }
  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  saveClicked() {
    if (this.isAuthenticated) {
      this.dataService.storeRestaurant();
    } else {
      this.router.navigate(['/auth']);
    }
  }
}
