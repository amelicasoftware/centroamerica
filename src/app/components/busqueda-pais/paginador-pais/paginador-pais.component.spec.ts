import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginadorPaisComponent } from './paginador-pais.component';

describe('PaginadorPaisComponent', () => {
  let component: PaginadorPaisComponent;
  let fixture: ComponentFixture<PaginadorPaisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaginadorPaisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginadorPaisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
