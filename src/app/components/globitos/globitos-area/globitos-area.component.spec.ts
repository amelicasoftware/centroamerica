import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobitosAreaComponent } from './globitos-area.component';

describe('GlobitosAreaComponent', () => {
  let component: GlobitosAreaComponent;
  let fixture: ComponentFixture<GlobitosAreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GlobitosAreaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobitosAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
