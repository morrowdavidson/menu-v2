import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { ToolbarComponent } from '../toolbar/toolbar.component';
import { NavRailComponent } from './nav-rail/nav-rail.component';

@Component({
  selector: 'app-editor',
  standalone: true,
  imports: [RouterOutlet, ToolbarComponent, NavRailComponent],
  templateUrl: './editor.component.html',
  styleUrl: './editor.component.scss',
})
export class EditorComponent {}
