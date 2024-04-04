import { Injectable } from '@angular/core';
import { MenuItem } from '../models/menu-item.model';
import { BehaviorSubject } from 'rxjs';
import { Section } from '../models/section.model';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  private _sections = new BehaviorSubject<Section[]>([]);
  sections$ = this._sections.asObservable();

  private _sectionsForView = new BehaviorSubject<Section[]>([]);
  sectionsForView$ = this._sectionsForView.asObservable();

  private _currentSectionTitle = new BehaviorSubject<string>('Default Section');
  currentSectionTitle$ = this._currentSectionTitle.asObservable();

  private _isEditingItem = new BehaviorSubject<boolean>(false);
  isEditingItem$ = this._isEditingItem.asObservable();

  private _isEditingSection = new BehaviorSubject<boolean>(false);
  isEditingSection$ = this._isEditingSection.asObservable();

  private _currentMenuItem = new BehaviorSubject<MenuItem>({
    name: '',
    description: '',
    price: 0,
  });
  currentMenuItem$ = this._currentMenuItem.asObservable();

  private _currentSection = new BehaviorSubject<Section>({
    title: '',
    menuItems: [],
  });
  currentSection$ = this._currentSection.asObservable();

  selection$ = this._currentMenuItem.asObservable();

  constructor() {
    this._sections.next([]);
  }

  addMenuItem(menuItemToAdd: MenuItem, sectionTitle: string) {
    const newMenuItem = { ...menuItemToAdd };
    const currentSections = this._sections.getValue();
    const updatedSections = currentSections.map((section) => {
      if (section.title === sectionTitle) {
        return {
          ...section,
          menuItems: [...section.menuItems, newMenuItem],
        };
      }
      return section;
    });
    this._sections.next(updatedSections);
  }
  editMenuItem() {
    this._isEditingItem.next(true);
    console.log(this._isEditingItem);
  }
  setCurrentMenuItem(menuItem: MenuItem) {
    this._currentMenuItem.next(menuItem);
  }
  deleteMenuItem(menuItemToDelete: MenuItem) {
    const currentSections = this._sections.getValue();
    const updatedSections = currentSections.map((section) => {
      return {
        ...section,
        menuItems: section.menuItems.filter(
          (item) => item !== menuItemToDelete
        ),
      };
    });
    this._sections.next(updatedSections);
    this.cancelEdit();
  }
  addSection(section: Section) {
    const currentSections = this._sections.getValue();
    const updatedSections = [...currentSections, section];
    this._sections.next(updatedSections);
  }
  cancelEdit() {
    this._isEditingItem.next(false);
  }
  editSection() {
    this._isEditingSection.next(true);
    console.log(this._isEditingSection);
  }
  cancelSectionEdit() {
    this._isEditingSection.next(false);
  }
  setCurrentSection(section: Section) {
    this._currentSection.next(section);
  }
  deleteSection(sectionToDelete: Section) {
    const currentSections = this._sections.getValue();
    const updatedSections = currentSections.filter(
      (section) => section !== sectionToDelete
    );
    this._sections.next(updatedSections);
    this.cancelSectionEdit();
  }
  getSections() {
    return this._sections.getValue();
  }
  setSections(sections: Section[]) {
    this._sections.next(sections);
  }
  setSectionsForView(sections: Section[]) {
    this._sectionsForView.next(sections);
  }
}
