import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddingbookComponent } from './addingbook.component';

describe('AddingbookComponent', () => {
  let component: AddingbookComponent;
  let fixture: ComponentFixture<AddingbookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddingbookComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddingbookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
