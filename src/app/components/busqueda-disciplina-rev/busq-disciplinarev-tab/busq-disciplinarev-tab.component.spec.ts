import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusqDisciplinarevTabComponent } from './busq-disciplinarev-tab.component';

describe('BusqDisciplinarevTabComponent', () => {
  let component: BusqDisciplinarevTabComponent;
  let fixture: ComponentFixture<BusqDisciplinarevTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusqDisciplinarevTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusqDisciplinarevTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
