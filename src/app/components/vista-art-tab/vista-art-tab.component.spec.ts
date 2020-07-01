import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaArtTABComponent } from './vista-art-tab.component';

describe('VistaArtTABComponent', () => {
  let component: VistaArtTABComponent;
  let fixture: ComponentFixture<VistaArtTABComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VistaArtTABComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VistaArtTABComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
