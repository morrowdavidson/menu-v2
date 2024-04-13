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
import { DataStorageService } from '../../../services/data-storage.service';
import { LoginService } from '../../../services/login.service';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-sort-section',
  standalone: true,
  imports: [CdkDropList, CdkDrag, MatCardModule],
  templateUrl: './sort-section.component.html',
  styleUrl: './sort-section.component.scss',
})
export class SortSectionComponent {
  isAuthenticated: boolean = false;
  user: User | null = null;

  constructor(
    private menuService: MenuService,
    private dataService: DataStorageService,
    private loginService: LoginService
  ) {}
  sections: Section[] = [];
  currentSection: Section = { title: '', menuItems: [] };
  private subscriptions = new Subscription();

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

  drop(event: CdkDragDrop<Section[]>) {
    moveItemInArray(this.sections, event.previousIndex, event.currentIndex);
    if (this.isAuthenticated) {
      this.dataService.storeMenu();
    }
  }
  sectionClicked(section: Section) {
    this.menuService.setCurrentSection(section);
    this.menuService.editSection();
  }
}
