import { MenuItem } from './menu-item.model';

export class Section {
  constructor(
    public title: string,
    public menuItems: MenuItem[] = [],
    public isEditing?: boolean
  ) {}
}
