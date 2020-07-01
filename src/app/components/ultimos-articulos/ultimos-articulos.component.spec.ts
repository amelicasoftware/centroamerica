import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UltimosArticulosComponent } from './ultimos-articulos.component';

describe('UltimosArticulosComponent', () => {
  let component: UltimosArticulosComponent;
  let fixture: ComponentFixture<UltimosArticulosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UltimosArticulosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UltimosArticulosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
