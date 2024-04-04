import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { MatMiniFabButton } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { DataStorageService } from '../../services/data-storage.service';

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
  constructor(private dataStorageService: DataStorageService) {}

  save() {
    this.dataStorageService.storeMenu();
    this.dataStorageService.storeRestaurant();
  }
  fetch() {
    this.dataStorageService.fetchMenu();
    this.dataStorageService.fetchRestaurant();
  }
}
