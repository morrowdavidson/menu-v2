import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { Section } from '../../../models/section.model';
import { MenuService } from '../../../services/menu.service';
import { DataStorageService } from '../../../services/data-storage.service';
import { LoginService } from '../../../services/login.service';
import { Subscription } from 'rxjs';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-add-section',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButton,
    FormsModule,
  ],
  templateUrl: './add-section.component.html',
  styleUrl: './add-section.component.scss',
})
export class AddSectionComponent {
  isAuthenticated: boolean = false;
  private userSub: Subscription = new Subscription();
  user: User | null = null;

  constructor(
    private menuService: MenuService,
    private dataService: DataStorageService,
    private loginService: LoginService
  ) {}
  newSectionName: string = '';

  ngOnInit() {
    this.userSub = this.loginService.user.subscribe((user) => {
      this.isAuthenticated = !!user;
      this.user = user;
    });
  }
  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

  addNewSection() {
    const newSection: Section = { title: this.newSectionName, menuItems: [] };
    this.menuService.addSection(newSection);
    if (this.isAuthenticated) {
      this.dataService.storeMenu();
    }
  }
}
