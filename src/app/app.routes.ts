import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { ItemsComponent } from './editor/items/items.component';
import { SectionsComponent } from './editor/sections/sections.component';
import { PreviewHeaderComponent } from './editor/preview-header/preview-header.component';
import { LoginComponent } from './editor/login/login.component';
import { MenuViewComponent } from './menu-view/menu-view.component';
import { EditorComponent } from './editor/editor.component';
import { RestaurantComponent } from './editor/restaurant/restaurant.component';

export const routes: Routes = [
  {
    path: '',
    component: EditorComponent,
    children: [
      { path: '', component: ItemsComponent },
      { path: 'sections', component: SectionsComponent },
      { path: 'preview', component: PreviewHeaderComponent },
      { path: 'auth', component: LoginComponent },
      { path: 'restaurant', component: RestaurantComponent },
    ],
  },
  { path: 'menu/:id', component: MenuViewComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
