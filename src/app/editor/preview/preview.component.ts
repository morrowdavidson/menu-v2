import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MenuService } from '../../services/menu.service';
import { Section } from '../../models/section.model';
import { Subscription } from 'rxjs';
import { CurrencyPipe } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { User } from '../../models/user.model';
import { LoginService } from '../../services/login.service';
import { MenuHeaderComponent } from '../../menu-header/menu-header.component';

@Component({
  selector: 'app-preview',
  standalone: true,
  imports: [MatTabsModule, CurrencyPipe, MatListModule, MenuHeaderComponent],
  templateUrl: './preview.component.html',
  styleUrl: './preview.component.scss',
})
export class PreviewComponent {
  sections: Section[] = [];
  selectionsSubscription?: Subscription;
  loginSubscription?: Subscription;
  user: User | null = null;

  constructor(
    private menuService: MenuService,
    private loginService: LoginService
  ) {}

  ngOnInit() {
    this.selectionsSubscription = this.menuService.sections$.subscribe(
      (sectionEls) => {
        this.sections = sectionEls;
      }
    );
    this.loginSubscription = this.loginService.user.subscribe((user) => {
      this.user = user;
    });
  }
  ngOnDestroy() {
    this.selectionsSubscription?.unsubscribe();
    this.loginSubscription?.unsubscribe();
  }
}
