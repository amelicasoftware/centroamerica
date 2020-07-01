import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaTablaComponent } from './vista-tabla.component';

describe('VistaTablaComponent', () => {
  let component: VistaTablaComponent;
  let fixture: ComponentFixture<VistaTablaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VistaTablaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VistaTablaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
