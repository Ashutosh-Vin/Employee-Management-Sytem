import { Component, inject } from '@angular/core';
import { Auth } from '../../services/auth';
import { MatCardModule } from '@angular/material/card';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [MatCardModule,ReactiveFormsModule,MatFormFieldModule,MatInputModule,MatButtonModule,MatIconModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {
  authservice = inject(Auth);

  fb=inject(FormBuilder);
  loginForm!:FormGroup;
  route = inject(Router);
  ngOnInit(){
    this.loginForm = this.fb.group({
      email:['',Validators.required],
      password: ['',Validators.required]
    });

    if(this.authservice.isLoggedIn){
      this.route.navigateByUrl("/");
    }

  }

  onLogin(){
    this.authservice.login(this.loginForm.value.email,this.loginForm.value.password).subscribe(result=>{
      this.authservice.saveToken(result);
      if(result.role=="Admin"){
        this.route.navigateByUrl("/");
      }
      else{
        this.route.navigateByUrl("/Employee-Dashboard");
      }
    })
  }
}
