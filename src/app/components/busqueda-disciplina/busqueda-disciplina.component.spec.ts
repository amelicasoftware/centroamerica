import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusquedaDisciplinaComponent } from './busqueda-disciplina.component';

describe('BusquedaDisciplinaComponent', () => {
  let component: BusquedaDisciplinaComponent;
  let fixture: ComponentFixture<BusquedaDisciplinaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusquedaDisciplinaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusquedaDisciplinaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
