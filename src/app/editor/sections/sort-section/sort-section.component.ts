import { Component } from '@angular/core';
import {
  CdkDragDrop,
  CdkDropList,
  CdkDrag,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import { MenuService } from '../../../services/menu.service';
import { Section } from '../../../models/section.model';
import { MatCardModule } from '@angular/material/card';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sort-section',
  standalone: true,
  imports: [CdkDropList, CdkDrag, MatCardModule],
  templateUrl: './sort-section.component.html',
  styleUrl: './sort-section.component.scss',
})
export class SortSectionComponent {
  constructor(private menuService: MenuService) {}
  sections: Section[] = [];
  currentSection: Section = { title: '', menuItems: [] };
  private subscriptions = new Subscription();

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

  drop(event: CdkDragDrop<Section[]>) {
    moveItemInArray(this.sections, event.previousIndex, event.currentIndex);
  }
  sectionClicked(section: Section) {
    this.menuService.setCurrentSection(section);
    this.menuService.editSection();
  }
}
