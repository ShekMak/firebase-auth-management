import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  signupForm: FormGroup = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.pattern(/[0-9a-zA-Z]{6,}/)
    ])
  });

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
  }

  signUpWithEmailAndPassword(): void {
    const email = this.signupForm.get('email')?.value;
    const password = this.signupForm.get('password')?.value;

    this.authService.signUpWithEmailAndPassword(email, password).then(
      (user) => {
        this.router.navigate(['home']);
      }
    ).catch(
      error => {
        alert('Authentification Problem');
        // master error message with the link bellow
        // https://firebase.google.com/docs/reference/js/v8/firebase.auth.Auth#createuserwithemailandpassword
      }
    );
  }

  signUpWithGoogle(): void {
    this.authService.signInWithGoogle().then(
      (user) => {
        this.router.navigate(['home']);
      }
    )
    .catch(
      (error) => {
        alert('Authentification Problem');
        // master error message with the link bellow
        // https://firebase.google.com/docs/reference/js/v8/firebase.auth.Auth#signinwithredirect
      }
    );
  }

}
