import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { FormsModule, NgForm } from '@angular/forms';
import { LoginService, AuthResponseData } from '../../services/login.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { DataStorageService } from '../../services/data-storage.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatFormField,
    MatInputModule,
    MatButton,
    MatIcon,
    MatIconModule,
    FormsModule,
    MatProgressSpinnerModule,
    MatCardModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  constructor(
    private loginService: LoginService,
    private router: Router,
    private dataStorageService: DataStorageService
  ) {}
  isLoginMode: boolean = false;
  isLoading: boolean = false;
  errorMsg: string | null = null;

  passwordVisible: boolean = false;
  loginClicked() {
    this.isLoginMode = true;
  }
  signUpClicked() {
    this.isLoginMode = false;
  }
  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    let authObs: Observable<AuthResponseData> = new Observable();

    this.isLoading = true;

    if (this.isLoginMode) {
      authObs = this.loginService.login(email, password);
    } else {
      authObs = this.loginService.signUp(email, password);
    }

    authObs.subscribe(
      (resData) => {
        console.log(resData);
        this.isLoading = false;
        this.router.navigate(['']);
        if (this.isLoginMode) {
          this.dataStorageService.fetchMenu();
          this.dataStorageService.fetchRestaurant();
        } else {
          this.dataStorageService.storeMenu();
          this.dataStorageService.storeRestaurant();
        }
      },
      (errorMessage) => {
        console.log(errorMessage);
        this.errorMsg = errorMessage;

        this.isLoading = false;
      }
    );
    form.reset();
  }
}
