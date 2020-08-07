import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusquedaDisciplinaTabComponent } from './busqueda-disciplina-tab.component';

describe('BusquedaDisciplinaTabComponent', () => {
  let component: BusquedaDisciplinaTabComponent;
  let fixture: ComponentFixture<BusquedaDisciplinaTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusquedaDisciplinaTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusquedaDisciplinaTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
