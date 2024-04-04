import { Component, OnInit } from '@angular/core';
import {
  CdkDragDrop,
  CdkDrag,
  CdkDropList,
  CdkDropListGroup,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { MenuService } from '../../../services/menu.service';
import { Section } from '../../../models/section.model';
import { MenuItem } from '../../../models/menu-item.model';
import { CurrencyPipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-menu-sort',
  standalone: true,
  imports: [
    CdkDropListGroup,
    CdkDropList,
    CdkDrag,
    CurrencyPipe,
    MatCardModule,
  ],
  templateUrl: './menu-sort.component.html',
  styleUrl: './menu-sort.component.scss',
})
export class MenuSortComponent implements OnInit {
  sections: Section[] = [];
  selectionsSubscription?: Subscription;

  constructor(private menuService: MenuService) {}

  ngOnInit() {
    this.selectionsSubscription = this.menuService.sections$.subscribe(
      (sectionEls) => {
        this.sections = sectionEls;
      }
    );
  }
  ngOnDestroy() {
    this.selectionsSubscription?.unsubscribe();
  }

  itemClicked(item: MenuItem) {
    this.menuService.editMenuItem();
    this.menuService.setCurrentMenuItem(item);
  }

  drop(event: CdkDragDrop<MenuItem[]>) {
    if (event.previousContainer === event.container) {
      console.log('same container::', event.container);
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      console.log('another container::', event.container);

      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
}
