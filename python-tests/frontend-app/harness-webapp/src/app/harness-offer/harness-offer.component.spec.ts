import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HarnessOfferComponent } from './harness-offer.component';

describe('HarnessOfferComponent', () => {
  let component: HarnessOfferComponent;
  let fixture: ComponentFixture<HarnessOfferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HarnessOfferComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HarnessOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
