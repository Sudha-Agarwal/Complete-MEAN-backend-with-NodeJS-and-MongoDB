import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { SignupComponent } from './signup.component';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;

  beforeEach(async() => {
    
    await TestBed.configureTestingModule({
      declarations: [SignupComponent],
      imports:[FormsModule, HttpClientTestingModule,]
    }).compileComponents();
    //httpMock = TestBed.inject(HttpTestingController);

    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create a signup Form', ()=>{
    const formElement: HTMLFormElement = fixture.nativeElement.querySelector('form');
    const name = formElement.querySelector('input[name="name"]');
    const age = formElement.querySelector('input[name="age"]');

    //other form elements
    const submitButton = formElement.querySelector('button[type="submit"]');

    expect(name).toBeTruthy();
    expect(submitButton).toBeTruthy();
  });

  it('should call onSubmit method when form is submitted',()=>{
    spyOn(component, 'onSubmit');
    const form = fixture.debugElement.query(By.css('form'));

    form.triggerEventHandler('ngSubmit',{});
    expect(component.onSubmit).toHaveBeenCalled();

  });

  it('should make a POST request/create a new user', ()=>{
    
  })


});
