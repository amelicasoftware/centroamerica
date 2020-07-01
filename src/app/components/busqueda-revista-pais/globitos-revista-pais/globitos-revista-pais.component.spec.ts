import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobitosRevistaPaisComponent } from './globitos-revista-pais.component';

describe('GlobitosRevistaPaisComponent', () => {
  let component: GlobitosRevistaPaisComponent;
  let fixture: ComponentFixture<GlobitosRevistaPaisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GlobitosRevistaPaisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobitosRevistaPaisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
