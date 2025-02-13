import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FotoCardComponent } from './foto-card.component';

describe('FotoCardComponent', () => {
  let component: FotoCardComponent;
  let fixture: ComponentFixture<FotoCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FotoCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FotoCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
