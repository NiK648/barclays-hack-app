import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private service: LoginService, private router: Router, private snackBar: MatSnackBar) { }

  register!: FormGroup;

  ngOnInit(): void {

    this.register = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required)
    })

  }

  registerUser() {
    if (this.register.status === 'VALID') {
      this.service.register(this.register.value).subscribe((data: any) => {
        if (data.body === "success") {
          this.snackBar.open('Registered Successfully. Please login.', '', {
            duration: 2000,
          });
          this.router.navigateByUrl('login');
        }
      }, (err) => {
        this.snackBar.open('Server Error. Please try later.', '', {
          duration: 2000,
        });
      })
    }
  }

}
