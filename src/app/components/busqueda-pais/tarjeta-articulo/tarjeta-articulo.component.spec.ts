import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TarjetaArticuloComponent } from './tarjeta-articulo.component';

describe('TarjetaArticuloComponent', () => {
  let component: TarjetaArticuloComponent;
  let fixture: ComponentFixture<TarjetaArticuloComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TarjetaArticuloComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TarjetaArticuloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
