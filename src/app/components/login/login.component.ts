import { AuthService } from './../../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  loginInput = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });
  invalidForm: boolean = false;
  errorMessage: string = '';


  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private router: Router) {
      if(authService.getTokenFromStorage() != null) {
        router.navigateByUrl('/home')
      }
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.invalidForm = false;
    if(this.loginInput.valid){
      this.authService.login(this.loginInput.get('email')?.value, this.loginInput.get('password')?.value)
      .subscribe({
        next: async (res) => {
          const token = await res.token;
          this.authService.saveTokenInStorage(token);
          this.router.navigateByUrl('/home');
        },
        error: (err) => {
          this.invalidForm = true;
          this.errorMessage = err.error.error;
        },
        complete: () => {

        }
      })
    } else {
      this.invalidForm = true;
      this.errorMessage = 'Por favor, completa todos los campos';
    }
  }

}
