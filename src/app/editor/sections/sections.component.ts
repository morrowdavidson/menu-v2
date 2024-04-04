import { Component } from '@angular/core';
import { AddSectionComponent } from './add-section/add-section.component';
import { SortSectionComponent } from './sort-section/sort-section.component';
import { MenuService } from '../../services/menu.service';
import { Section } from '../../models/section.model';
import { EditSectionComponent } from './edit-section/edit-section.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sections',
  standalone: true,
  imports: [AddSectionComponent, SortSectionComponent, EditSectionComponent],
  templateUrl: './sections.component.html',
  styleUrl: './sections.component.scss',
})
export class SectionsComponent {
  constructor(private menuService: MenuService) {}
  currentSection: Section = { title: '', menuItems: [] };
  isEditingSection: boolean = false;
  private subscriptions = new Subscription();

  ngOnInit() {
    this.subscriptions.add(
      this.menuService.currentSection$.subscribe((section) => {
        this.currentSection = section;
      })
    );
    this.subscriptions.add(
      this.menuService.isEditingSection$.subscribe((isEditing) => {
        this.isEditingSection = isEditing;
        console.log('isEditingSection:', this.isEditingSection);
      })
    );
  }
  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
