import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { CommonService } from '../common.service';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private router: Router,
    private service: LoginService,
    private snackBar: MatSnackBar,
    private cookies: CookieService,
    private common: CommonService
  ) { }

  ngOnInit(): void {
  }

  user: any = {
    username: '',
    password: '',
  };

  login() {
    this.common.showLoader = true;
    this.service.login(this.user).subscribe(
      (data: any) => {
        this.common.showLoader = false;
        if (data != null && data.name != undefined) {
          this.cookies.set('user-info', JSON.stringify(data), { expires: 2 });
          this.router.navigate(['/list']);
        } else {
          this.snackBar.open('Server Error. Please try later.', '', {
            duration: 2000,
          });
        }
      },
      (err: any) => {
        this.common.showLoader = false;
      }
    );
  }

  register() {
    this.router.navigateByUrl('register');
  }


}
