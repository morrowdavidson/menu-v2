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
import { DataStorageService } from '../../../services/data-storage.service';
import { LoginService } from '../../../services/login.service';
import { User } from '../../../models/user.model';

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
  isAuthenticated: boolean = false;
  private userSub: Subscription = new Subscription();
  user: User | null = null;

  constructor(
    private menuService: MenuService,
    private loginService: LoginService,
    private dataService: DataStorageService
  ) {}

  ngOnInit() {
    this.selectionsSubscription = this.menuService.sections$.subscribe(
      (sectionEls) => {
        this.sections = sectionEls;
      }
    );
    this.userSub = this.loginService.user.subscribe((user) => {
      this.isAuthenticated = !!user;
      this.user = user;
    });
  }
  ngOnDestroy() {
    this.selectionsSubscription?.unsubscribe();
    this.userSub.unsubscribe();
  }

  itemClicked(item: MenuItem) {
    this.menuService.editMenuItem();
    this.menuService.setCurrentMenuItem(item);
  }

  drop(event: CdkDragDrop<MenuItem[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
    if (this.isAuthenticated) {
      this.dataService.storeMenu();
    }
  }
}
