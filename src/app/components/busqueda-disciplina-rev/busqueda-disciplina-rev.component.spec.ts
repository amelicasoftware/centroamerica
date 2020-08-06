import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusquedaDisciplinaRevComponent } from './busqueda-disciplina-rev.component';

describe('BusquedaDisciplinaRevComponent', () => {
  let component: BusquedaDisciplinaRevComponent;
  let fixture: ComponentFixture<BusquedaDisciplinaRevComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusquedaDisciplinaRevComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusquedaDisciplinaRevComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
