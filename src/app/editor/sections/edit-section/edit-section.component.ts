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
  constructor(
    private menuService: MenuService,
    private dataService: DataStorageService
  ) {}
  currentSection: Section = { title: '', menuItems: [] };
  private subscriptions = new Subscription();

  ngOnInit() {
    this.subscriptions.add(
      this.menuService.currentSection$.subscribe((section) => {
        this.currentSection = section;
      })
    );
  }
  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
  saveClicked() {
    this.menuService.cancelSectionEdit();
    this.dataService.storeMenu();
  }
  deleteClicked(section: Section) {
    this.menuService.deleteSection(this.currentSection);
    this.dataService.storeMenu();
  }
}
