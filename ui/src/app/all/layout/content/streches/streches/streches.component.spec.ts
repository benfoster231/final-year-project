import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StrechesComponent } from './streches.component';

describe('StrechesComponent', () => {
  let component: StrechesComponent;
  let fixture: ComponentFixture<StrechesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StrechesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StrechesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
