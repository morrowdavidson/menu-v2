import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { DataStorageService } from './services/data-storage.service';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'menu-v2';

  constructor(
    private dataStorageService: DataStorageService,
    private loginService: LoginService
  ) {}

  ngOnInit() {
    this.loginService.autoLogin();

    if (this.loginService.user.value) {
      this.dataStorageService.fetchMenu();
      this.dataStorageService.fetchRestaurant();
    }
  }
}
