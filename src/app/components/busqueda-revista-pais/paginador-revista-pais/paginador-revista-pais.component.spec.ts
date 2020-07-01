import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginadorRevistaPaisComponent } from './paginador-revista-pais.component';

describe('PaginadorRevistaPaisComponent', () => {
  let component: PaginadorRevistaPaisComponent;
  let fixture: ComponentFixture<PaginadorRevistaPaisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaginadorRevistaPaisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginadorRevistaPaisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
