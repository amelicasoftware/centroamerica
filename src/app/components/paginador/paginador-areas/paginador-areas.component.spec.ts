import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginadorAreasComponent } from './paginador-areas.component';

describe('PaginadorAreasComponent', () => {
  let component: PaginadorAreasComponent;
  let fixture: ComponentFixture<PaginadorAreasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaginadorAreasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginadorAreasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
