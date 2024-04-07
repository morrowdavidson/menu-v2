import { Component } from '@angular/core';
import { PreviewComponent } from '../../preview/preview.component';
import { MenuHeaderComponent } from '../../menu-header/menu-header.component';

@Component({
  selector: 'app-preview-header',
  standalone: true,
  imports: [PreviewComponent, MenuHeaderComponent],
  templateUrl: './preview-header.component.html',
  styleUrl: './preview-header.component.scss',
})
export class PreviewHeaderComponent {}
