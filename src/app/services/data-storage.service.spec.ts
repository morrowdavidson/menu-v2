import { TestBed } from '@angular/core/testing';

import { DataStorageService } from './data-storage.service';

import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('DataStorageService', () => {
  let service: DataStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(DataStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
