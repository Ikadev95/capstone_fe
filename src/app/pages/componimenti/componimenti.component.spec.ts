import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponimentiComponent } from './componimenti.component';

describe('ComponimentiComponent', () => {
  let component: ComponimentiComponent;
  let fixture: ComponentFixture<ComponimentiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ComponimentiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComponimentiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
