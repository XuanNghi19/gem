import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstandComponent } from './instand.component';

describe('InstandComponent', () => {
  let component: InstandComponent;
  let fixture: ComponentFixture<InstandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstandComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InstandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
