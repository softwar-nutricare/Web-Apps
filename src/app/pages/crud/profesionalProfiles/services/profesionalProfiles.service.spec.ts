import { TestBed } from '@angular/core/testing';

import { ProfsionalProfilesService } from './profsionalProfiles.service';

describe('ProfsionalProfilesService', () => {
  let service: ProfsionalProfilesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfsionalProfilesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
