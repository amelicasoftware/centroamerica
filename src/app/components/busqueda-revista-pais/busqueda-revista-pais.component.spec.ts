import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusquedaRevistaPaisComponent } from './busqueda-revista-pais.component';

describe('BusquedaRevistaPaisComponent', () => {
  let component: BusquedaRevistaPaisComponent;
  let fixture: ComponentFixture<BusquedaRevistaPaisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusquedaRevistaPaisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusquedaRevistaPaisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
