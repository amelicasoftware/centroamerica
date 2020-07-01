import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobitosPaisComponent } from './globitos-pais.component';

describe('GlobitosPaisComponent', () => {
  let component: GlobitosPaisComponent;
  let fixture: ComponentFixture<GlobitosPaisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GlobitosPaisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobitosPaisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
