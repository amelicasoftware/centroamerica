import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaTablaArticulosComponent } from './vista-tabla-articulos.component';

describe('VistaTablaArticulosComponent', () => {
  let component: VistaTablaArticulosComponent;
  let fixture: ComponentFixture<VistaTablaArticulosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VistaTablaArticulosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VistaTablaArticulosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
