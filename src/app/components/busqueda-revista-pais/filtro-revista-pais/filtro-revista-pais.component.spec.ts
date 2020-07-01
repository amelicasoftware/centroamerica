import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroRevistaPaisComponent } from './filtro-revista-pais.component';

describe('FiltroRevistaPaisComponent', () => {
  let component: FiltroRevistaPaisComponent;
  let fixture: ComponentFixture<FiltroRevistaPaisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FiltroRevistaPaisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltroRevistaPaisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
