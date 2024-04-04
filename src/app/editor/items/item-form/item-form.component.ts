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

  constructor(private menuService: MenuService) {}

  ngOnInit() {
    this.subscriptions.add(
      this.menuService.sections$.subscribe((sectionEls) => {
        this.sections = sectionEls;
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
