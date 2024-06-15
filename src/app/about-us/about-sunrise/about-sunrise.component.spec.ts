import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutSunriseComponent } from './about-sunrise.component';

describe('AboutSunriseComponent', () => {
  let component: AboutSunriseComponent;
  let fixture: ComponentFixture<AboutSunriseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AboutSunriseComponent]
    });
    fixture = TestBed.createComponent(AboutSunriseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
