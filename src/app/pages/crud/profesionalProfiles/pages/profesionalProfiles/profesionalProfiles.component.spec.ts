import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfesionalProfilesComponent } from './profesionalProfiles.component';

describe('ProfesionalProfilesComponent', () => {
  let component: ProfesionalProfilesComponent;
  let fixture: ComponentFixture<ProfesionalProfilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfesionalProfilesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfesionalProfilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
