import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppoimentComponent } from './appoiment.component';

describe('AppoimentComponent', () => {
  let component: AppoimentComponent;
  let fixture: ComponentFixture<AppoimentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppoimentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppoimentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
