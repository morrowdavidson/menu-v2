import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuSortComponent } from './menu-sort.component';

import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('MenuSortComponent', () => {
  let component: MenuSortComponent;
  let fixture: ComponentFixture<MenuSortComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuSortComponent, HttpClientTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(MenuSortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
