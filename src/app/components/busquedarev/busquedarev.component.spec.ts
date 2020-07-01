import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusquedarevComponent } from './busquedarev.component';

describe('BusquedarevComponent', () => {
  let component: BusquedarevComponent;
  let fixture: ComponentFixture<BusquedarevComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusquedarevComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusquedarevComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
