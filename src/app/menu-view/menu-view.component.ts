import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataStorageService } from '../services/data-storage.service';
import { Section } from '../models/section.model';
import { MenuService } from '../services/menu.service';
import { MatTabsModule } from '@angular/material/tabs';
import { CurrencyPipe } from '@angular/common';
import { PreviewComponent } from '../preview/preview.component';
import { MenuHeaderComponent } from '../menu-header/menu-header.component';

@Component({
  selector: 'app-menu-view',
  standalone: true,
  imports: [MatTabsModule, CurrencyPipe, PreviewComponent, MenuHeaderComponent],
  templateUrl: './menu-view.component.html',
  styleUrl: './menu-view.component.scss',
})
export class MenuViewComponent {
  id: string | null = '';
  sectionsForView: Section[] = [];

  constructor(
    private route: ActivatedRoute,
    private dataStorageService: DataStorageService
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.dataStorageService.displayMenu(this.id);
  }
}
