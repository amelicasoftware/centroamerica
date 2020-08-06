import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginadorDiscRevComponent } from './paginador-disc-rev.component';

describe('PaginadorDiscRevComponent', () => {
  let component: PaginadorDiscRevComponent;
  let fixture: ComponentFixture<PaginadorDiscRevComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaginadorDiscRevComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginadorDiscRevComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
