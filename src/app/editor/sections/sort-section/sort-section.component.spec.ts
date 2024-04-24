import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SortSectionComponent } from './sort-section.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('SortSectionComponent', () => {
  let component: SortSectionComponent;
  let fixture: ComponentFixture<SortSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SortSectionComponent, HttpClientTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(SortSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
