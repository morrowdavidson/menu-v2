import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { MatMiniFabButton } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { DataStorageService } from '../../services/data-storage.service';
import { LoginService } from '../../services/login.service';
import { Subscription } from 'rxjs';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-nav-rail',
  standalone: true,
  imports: [
    MatButton,
    MatIconModule,
    MatIconButton,
    MatMiniFabButton,
    RouterModule,
  ],
  templateUrl: './nav-rail.component.html',
  styleUrl: './nav-rail.component.scss',
})
export class NavRailComponent {
  isAuthenticated: boolean = false;
  private userSub: Subscription = new Subscription();
  user: User | null = null;

  constructor(
    private dataStorageService: DataStorageService,
    private loginService: LoginService
  ) {}

  ngOnInit() {
    this.userSub = this.loginService.user.subscribe((user) => {
      this.isAuthenticated = !!user;
      this.user = user;
    });
  }
  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

  save() {
    this.dataStorageService.storeMenu();
    this.dataStorageService.storeRestaurant();
  }
  fetch() {
    this.dataStorageService.fetchMenu();
    this.dataStorageService.fetchRestaurant();
  }
}
