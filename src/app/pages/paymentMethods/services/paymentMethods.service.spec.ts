import { TestBed } from '@angular/core/testing';

import { PaymentMethodsService} from "./paymentMethods.service";

describe('PaymentMethodsService', () => {
  let service: PaymentMethodsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaymentMethodsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
