import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltdiscRevComponent } from './filtdisc-rev.component';

describe('FiltdiscRevComponent', () => {
  let component: FiltdiscRevComponent;
  let fixture: ComponentFixture<FiltdiscRevComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FiltdiscRevComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltdiscRevComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
