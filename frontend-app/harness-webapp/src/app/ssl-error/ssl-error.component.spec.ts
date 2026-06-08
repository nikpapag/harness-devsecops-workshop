import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SslErrorComponent } from './ssl-error.component';

describe('SslErrorComponent', () => {
  let component: SslErrorComponent;
  let fixture: ComponentFixture<SslErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SslErrorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SslErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have error code defined', () => {
    expect(component.errorCode).toBe('NET::ERR_CERT_AUTHORITY_INVALID');
  });

  it('should reload page when reloadPage is called', () => {
    spyOn(window.location, 'reload');
    component.reloadPage();
    expect(window.location.reload).toHaveBeenCalled();
  });

  it('should go back when goBack is called', () => {
    spyOn(window.history, 'back');
    component.goBack();
    expect(window.history.back).toHaveBeenCalled();
  });

  it('should return current date string', () => {
    const dateString = component.getCurrentDate();
    expect(dateString).toBeTruthy();
    expect(typeof dateString).toBe('string');
  });
});
