import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltrosAreaComponent } from './filtros-area.component';

describe('FiltrosAreaComponent', () => {
  let component: FiltrosAreaComponent;
  let fixture: ComponentFixture<FiltrosAreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FiltrosAreaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltrosAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
