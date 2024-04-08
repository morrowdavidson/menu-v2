import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { Section } from '../../../models/section.model';
import { MenuService } from '../../../services/menu.service';
import { DataStorageService } from '../../../services/data-storage.service';

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
  constructor(
    private menuService: MenuService,
    private dataService: DataStorageService
  ) {}
  newSectionName: string = '';

  addNewSection() {
    console.log('addNewSection:' + this.newSectionName);
    const newSection: Section = { title: this.newSectionName, menuItems: [] };
    console.log(this.newSectionName);
    this.menuService.addSection(newSection);
    this.dataService.storeMenu();
  }
}
