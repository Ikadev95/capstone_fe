import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConcorsoPoesieComponent } from './concorso-poesie.component';

describe('ConcorsoPoesieComponent', () => {
  let component: ConcorsoPoesieComponent;
  let fixture: ComponentFixture<ConcorsoPoesieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConcorsoPoesieComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConcorsoPoesieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
