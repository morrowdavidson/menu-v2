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
import { FileUpload } from '../../../models/file-upload.model';
import { DataStorageService } from '../../../services/data-storage.service';
import { LoginService } from '../../../services/login.service';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-item-form',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButton,
    FormsModule,
  ],
  templateUrl: './item-form.component.html',
  styleUrl: './item-form.component.scss',
})
export class ItemFormComponent {
  sections: Section[] = [];
  private subscriptions = new Subscription();
  selectedFile: File | null = null;
  currentFileUpload?: FileUpload;
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
  addNewItem(section: string) {
    this.menuService.addMenuItem(this.newMenuItem, this.sectionTitle);
    console.log(this.sectionTitle);
    if (this.isAuthenticated) {
      this.dataService.storeMenu();
    }
    this.clearForm();
  }
  clearForm() {
    this.newMenuItem = {
      name: '',
      description: '',
      price: 0,
    };
  }
}
