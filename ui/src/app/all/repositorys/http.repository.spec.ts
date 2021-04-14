import { TestBed } from '@angular/core/testing';
import { HttpRepository } from './http.repository';

describe('HttpService', () => {
  let service: HttpRepository;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpRepository);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
