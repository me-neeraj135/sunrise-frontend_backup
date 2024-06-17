import { ComponentFixture, TestBed } from '@angular/core/testing'

import { classesDetailsComponent } from './classes-details.component'

describe('classesDetailsComponent', () => {
  let component: classesDetailsComponent
  let fixture: ComponentFixture<classesDetailsComponent>

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [classesDetailsComponent],
    })
    fixture = TestBed.createComponent(classesDetailsComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
