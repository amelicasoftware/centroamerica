import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaRevistaComponent } from './tabla-revista.component';

describe('TablaRevistaComponent', () => {
  let component: TablaRevistaComponent;
  let fixture: ComponentFixture<TablaRevistaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablaRevistaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaRevistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
