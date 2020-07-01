import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RevistasTableComponent } from './revistas-table.component';

describe('RevistasTableComponent', () => {
  let component: RevistasTableComponent;
  let fixture: ComponentFixture<RevistasTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RevistasTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RevistasTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
