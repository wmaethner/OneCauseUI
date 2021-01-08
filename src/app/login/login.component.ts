import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';

import { LoginService } from '../login.service';
import { RedirectService } from '../redirect.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage: string;

  constructor(private formBuilder: FormBuilder,
              private loginService: LoginService,
              private redirectService: RedirectService) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
            username: [''],
            password: ['']
        });
  }

  onSubmit(creds) {
    this.errorMessage = "";
    var username = this.loginForm.value["username"];
    var password = this.loginForm.value["password"];
    this.loginService.login(username, password).subscribe((data: Response) => {
      if (data.Result) {
        console.log("Success");
        this.redirectService.redirectToUrl('http://onecause.com');
      } else {
        console.log("Fail " + data.ErrorMessage);
        this.errorMessage = data.ErrorMessage;
      }
    });
  }
}

export class Response {
  Result: boolean;
  ErrorMessage: string;
}
