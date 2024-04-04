import { Component } from '@angular/core';
import { ItemFormComponent } from './item-form/item-form.component';
import { MenuSortComponent } from './menu-sort/menu-sort.component';
import { MenuService } from '../../services/menu.service';
import { Subscription } from 'rxjs';
import { EditItemFormComponent } from './edit-item-form/edit-item-form.component';

@Component({
  selector: 'app-items',
  standalone: true,
  imports: [ItemFormComponent, MenuSortComponent, EditItemFormComponent],
  templateUrl: './items.component.html',
  styleUrl: './items.component.scss',
})
export class ItemsComponent {
  isEditingItem: boolean = false;
  isEditingItemSubscription?: Subscription;

  constructor(private menuService: MenuService) {}

  ngOnInit() {
    this.isEditingItemSubscription = this.menuService.isEditingItem$.subscribe(
      (isEditing) => {
        this.isEditingItem = isEditing;
      }
    );
  }

  ngOnDestroy() {
    this.isEditingItemSubscription?.unsubscribe();
  }
}
