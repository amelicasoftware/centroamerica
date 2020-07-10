import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusquedaPalClavComponent } from './busqueda-pal-clav.component';

describe('BusquedaPalClavComponent', () => {
  let component: BusquedaPalClavComponent;
  let fixture: ComponentFixture<BusquedaPalClavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusquedaPalClavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusquedaPalClavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
