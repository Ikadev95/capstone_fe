import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssegnaGiudiceComponent } from './assegna-giudice.component';

describe('AssegnaGiudiceComponent', () => {
  let component: AssegnaGiudiceComponent;
  let fixture: ComponentFixture<AssegnaGiudiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AssegnaGiudiceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssegnaGiudiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
