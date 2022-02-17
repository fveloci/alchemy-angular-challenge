import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

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


  constructor(private fb: FormBuilder) {

  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.invalidForm = false;
    if(this.loginInput.valid){
      console.log(this.loginInput.value)
      this.loginInput.reset();
    } else {
      this.invalidForm = true;
    }
  }

}
