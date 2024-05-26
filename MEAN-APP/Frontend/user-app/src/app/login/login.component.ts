import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private http: HttpClient){}

  onSubmit(loginForm:NgForm){
    if(loginForm.invalid){
      return;
    }

    const formData = loginForm.value;

    this.http.post('http://localhost:3000/api/login', formData).subscribe({
      next: (response:any)=>{
        alert(response.message);
        loginForm.reset();
      },
      error:error=>alert(error.error.error)
    })

}
}
