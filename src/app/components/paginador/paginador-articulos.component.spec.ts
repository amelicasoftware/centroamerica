import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginadorArticulosComponent } from './paginador-articulos.component';

describe('PaginadorArticulosComponent', () => {
  let component: PaginadorArticulosComponent;
  let fixture: ComponentFixture<PaginadorArticulosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaginadorArticulosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginadorArticulosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
