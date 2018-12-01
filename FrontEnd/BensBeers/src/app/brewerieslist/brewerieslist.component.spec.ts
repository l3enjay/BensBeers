import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrewerieslistComponent } from './brewerieslist.component';

describe('BrewerieslistComponent', () => {
  let component: BrewerieslistComponent;
  let fixture: ComponentFixture<BrewerieslistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrewerieslistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrewerieslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
