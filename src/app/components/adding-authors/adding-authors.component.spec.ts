import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddingAuthorsComponent } from './adding-authors.component';

describe('AddingAuthorsComponent', () => {
  let component: AddingAuthorsComponent;
  let fixture: ComponentFixture<AddingAuthorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddingAuthorsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddingAuthorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
