import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskMenuContainerComponent } from './task-menu-container.component';

describe('TaskMenuContainerComponent', () => {
  let component: TaskMenuContainerComponent;
  let fixture: ComponentFixture<TaskMenuContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskMenuContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskMenuContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
