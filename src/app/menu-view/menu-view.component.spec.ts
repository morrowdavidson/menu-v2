import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuViewComponent } from './menu-view.component';

import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('MenuViewComponent', () => {
  let component: MenuViewComponent;
  let fixture: ComponentFixture<MenuViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuViewComponent, HttpClientTestingModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: 'testId' }), // Mock any necessary properties here
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MenuViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
