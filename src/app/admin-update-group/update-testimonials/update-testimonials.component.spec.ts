import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateTestimonialsComponent } from './update-testimonials.component';

describe('UpdateTestimonialsComponent', () => {
  let component: UpdateTestimonialsComponent;
  let fixture: ComponentFixture<UpdateTestimonialsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateTestimonialsComponent]
    });
    fixture = TestBed.createComponent(UpdateTestimonialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
