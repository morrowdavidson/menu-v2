import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataStorageService } from '../services/data-storage.service';
import { Section } from '../models/section.model';
import { MenuService } from '../services/menu.service';
import { Subscription } from 'rxjs';
import { MatTabsModule } from '@angular/material/tabs';
import { CurrencyPipe } from '@angular/common';
import { PreviewComponent } from '../editor/preview/preview.component';

@Component({
  selector: 'app-menu-view',
  standalone: true,
  imports: [MatTabsModule, CurrencyPipe, PreviewComponent],
  templateUrl: './menu-view.component.html',
  styleUrl: './menu-view.component.scss',
})
export class MenuViewComponent {
  id: string | null = '';
  sectionsForView: Section[] = [];
  selectionsSubscription?: Subscription;

  constructor(
    private route: ActivatedRoute,
    private dataStorageService: DataStorageService,
    private menuService: MenuService
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.dataStorageService.displayMenu(this.id);
    this.selectionsSubscription = this.menuService.sectionsForView$.subscribe(
      (sectionEls) => {
        this.sectionsForView = sectionEls;
      }
    );
    console.log(this.sectionsForView);
  }
  ngOnDestroy() {
    this.selectionsSubscription?.unsubscribe();
  }
}
