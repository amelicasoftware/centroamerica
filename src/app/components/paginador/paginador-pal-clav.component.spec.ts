import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginadorPalClavComponent } from './paginador-pal-clav.component';

describe('PaginadorPalClavComponent', () => {
  let component: PaginadorPalClavComponent;
  let fixture: ComponentFixture<PaginadorPalClavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaginadorPalClavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginadorPalClavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
