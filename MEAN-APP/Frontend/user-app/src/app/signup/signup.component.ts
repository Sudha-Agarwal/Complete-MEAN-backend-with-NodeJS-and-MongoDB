import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  errors:any = {};

  constructor(private http: HttpClient){}


onSubmit(form:NgForm){
  this.http.post('http://localhost:3000/api/signup', form.value).subscribe({
    next: (response:any)=>{
      alert(response.message);
      form.reset();
    },
    error: error=>{
      console.log(error);
      this.errors = error.error.errors;
    }
    
  })
}


  

}
