import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCreateClientsComponent } from './dialog-create-clients.component';

describe('DialogCreateComponent', () => {
  let component: DialogCreateClientsComponent;
  let fixture: ComponentFixture<DialogCreateClientsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogCreateClientsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogCreateClientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
