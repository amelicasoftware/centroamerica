import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobitosDiscRevComponent } from './globitos-disc-rev.component';

describe('GlobitosDiscRevComponent', () => {
  let component: GlobitosDiscRevComponent;
  let fixture: ComponentFixture<GlobitosDiscRevComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GlobitosDiscRevComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobitosDiscRevComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
