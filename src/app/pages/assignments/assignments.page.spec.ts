import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AssignmentsPage } from './assignments.page';

describe('AssignmentsPage', () => {
  let component: AssignmentsPage;
  let fixture: ComponentFixture<AssignmentsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AssignmentsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
