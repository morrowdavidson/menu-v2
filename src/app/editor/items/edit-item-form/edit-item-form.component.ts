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

  constructor(private menuService: MenuService) {}

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
  }
  deleteItem(itemToBeDeleted: MenuItem) {
    this.menuService.deleteMenuItem(this.editMenuItem);
  }
  cancel() {
    this.menuService.cancelEdit();
  }
}
