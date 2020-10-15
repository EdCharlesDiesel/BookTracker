import { TestBed } from '@angular/core/testing';

import { BooksResolverService } from './books-resolver.service';

describe('BooksResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BooksResolverService = TestBed.get(BooksResolverService);
    expect(service).toBeTruthy();
  });
});
