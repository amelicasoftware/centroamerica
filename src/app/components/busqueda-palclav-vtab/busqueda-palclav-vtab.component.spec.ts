import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusquedaPalclavVtabComponent } from './busqueda-palclav-vtab.component';

describe('BusquedaPalclavVtabComponent', () => {
  let component: BusquedaPalclavVtabComponent;
  let fixture: ComponentFixture<BusquedaPalclavVtabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusquedaPalclavVtabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusquedaPalclavVtabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
