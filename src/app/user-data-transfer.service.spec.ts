import { TestBed, inject } from '@angular/core/testing';

import { UserDataTransferService } from './user-data-transfer.service';

describe('UserDataTransferService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserDataTransferService]
    });
  });

  it('should be created', inject([UserDataTransferService], (service: UserDataTransferService) => {
    expect(service).toBeTruthy();
  }));
});
