import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SerachBookComponent } from './serach-book.component';

describe('SerachBookComponent', () => {
  let component: SerachBookComponent;
  let fixture: ComponentFixture<SerachBookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SerachBookComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SerachBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
