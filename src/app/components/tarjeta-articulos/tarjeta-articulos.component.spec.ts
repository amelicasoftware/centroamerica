import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TarjetaArticulosComponent } from './tarjeta-articulos.component';

describe('TarjetaArticulosComponent', () => {
  let component: TarjetaArticulosComponent;
  let fixture: ComponentFixture<TarjetaArticulosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TarjetaArticulosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TarjetaArticulosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
