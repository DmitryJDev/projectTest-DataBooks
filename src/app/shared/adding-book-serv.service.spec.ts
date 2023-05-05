import { TestBed } from '@angular/core/testing';

import { AddingBookServService } from './adding-book-serv.service';

describe('AddingBookServService', () => {
  let service: AddingBookServService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddingBookServService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
