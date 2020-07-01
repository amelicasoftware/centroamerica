import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaArticuloComponent } from './tabla-articulo.component';

describe('TablaArticuloComponent', () => {
  let component: TablaArticuloComponent;
  let fixture: ComponentFixture<TablaArticuloComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablaArticuloComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaArticuloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
