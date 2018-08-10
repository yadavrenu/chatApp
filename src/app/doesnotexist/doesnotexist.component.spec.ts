import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoesnotexistComponent } from './doesnotexist.component';

describe('DoesnotexistComponent', () => {
  let component: DoesnotexistComponent;
  let fixture: ComponentFixture<DoesnotexistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoesnotexistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoesnotexistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
