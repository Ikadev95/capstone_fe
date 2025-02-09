import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistraGiudiceComponent } from './registra-giudice.component';

describe('RegistraGiudiceComponent', () => {
  let component: RegistraGiudiceComponent;
  let fixture: ComponentFixture<RegistraGiudiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegistraGiudiceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistraGiudiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
