import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { MenuItem } from '../../../models/menu-item.model';
import { FormsModule } from '@angular/forms';
import { MenuService } from '../../../services/menu.service';
import { Section } from '../../../models/section.model';
import { Subscription } from 'rxjs';
import { DataStorageService } from '../../../services/data-storage.service';
import { LoginService } from '../../../services/login.service';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-edit-item-form',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButton,
    FormsModule,
  ],
  templateUrl: './edit-item-form.component.html',
  styleUrl: './edit-item-form.component.scss',
})
export class EditItemFormComponent {
  sections: Section[] = [];
  editMenuItem: MenuItem = {
    name: '',
    description: '',
    price: 0,
  };
  private subscriptions = new Subscription();
  isAuthenticated: boolean = false;
  user: User | null = null;

  constructor(
    private menuService: MenuService,
    private dataService: DataStorageService,
    private loginService: LoginService
  ) {}

  ngOnInit() {
    this.subscriptions.add(
      this.menuService.sections$.subscribe((sectionEls) => {
        this.sections = sectionEls;
      })
    );

    this.subscriptions.add(
      this.menuService.currentMenuItem$.subscribe((menuItem) => {
        this.editMenuItem = menuItem;
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

  sectionTitle: string = 'Default Section';

  newMenuItem: MenuItem = {
    name: '',
    description: '',
    price: 0,
  };
  addNewItem() {
    this.menuService.addMenuItem(this.newMenuItem, this.sectionTitle);
    this.checkAuth();
    console.log(this.sectionTitle);
  }
  deleteItem() {
    this.menuService.deleteMenuItem(this.editMenuItem);
    this.checkAuth();
  }
  cancel() {
    this.menuService.cancelEdit();
  }
  checkAuth() {
    if (this.isAuthenticated) {
      this.dataService.storeMenu();
    }
  }
}
