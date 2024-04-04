import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { LoginService } from '../services/login.service';
import { Subscription } from 'rxjs';
import { User } from '../models/user.model';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, RouterModule],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss',
})
export class ToolbarComponent implements OnInit {
  isAuthenticated: boolean = false;
  private userSub: Subscription = new Subscription();
  user: User | null = null;

  constructor(public loginService: LoginService) {}

  ngOnInit() {
    this.userSub = this.loginService.user.subscribe((user) => {
      this.isAuthenticated = !!user;
      this.user = user;
    });
  }
  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
  logoutClicked() {
    this.loginService.logout();
  }
}
