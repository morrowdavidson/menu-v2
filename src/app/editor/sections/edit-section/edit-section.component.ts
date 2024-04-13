import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { Section } from '../../../models/section.model';
import { MenuService } from '../../../services/menu.service';
import { Subscription } from 'rxjs';
import { DataStorageService } from '../../../services/data-storage.service';
import { LoginService } from '../../../services/login.service';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-edit-section',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButton,
    FormsModule,
  ],
  templateUrl: './edit-section.component.html',
  styleUrl: './edit-section.component.scss',
})
export class EditSectionComponent {
  isAuthenticated: boolean = false;
  user: User | null = null;

  constructor(
    private menuService: MenuService,
    private dataService: DataStorageService,
    private loginService: LoginService
  ) {}
  currentSection: Section = { title: '', menuItems: [] };
  private subscriptions = new Subscription();

  ngOnInit() {
    this.subscriptions.add(
      this.menuService.currentSection$.subscribe((section) => {
        this.currentSection = section;
      })
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
    this.menuService.cancelSectionEdit();
    this.checkAuthAndStore();
  }
  deleteClicked(section: Section) {
    this.menuService.deleteSection(this.currentSection);
    this.checkAuthAndStore();
  }
  checkAuthAndStore() {
    if (this.isAuthenticated) {
      this.dataService.storeMenu();
    }
  }
}
