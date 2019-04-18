import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { NgForm } from '@angular/forms';
import { BackendService } from '../../services/backend.service';
import { UserAuthService } from '../../services/user-auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {
  public page_title: string;
  public user: User;
  public pwd_confirmation: string;
  constructor(
    private backend: BackendService,
    private _user: UserAuthService
  ) {
    this.page_title = 'Regístrate';
    this.user = new User(1,'','','','','','','');
    this.pwd_confirmation = '';
  }

  ngOnInit() {
  }
  onSubmit(registerForm: NgForm) {
    this.backend.register(this.user).subscribe(
      response => {
        this.backend.login(this.user).subscribe(
          response => {
            this._user.login(response);
          }, error => {
            console.log(<any> error);
          }
        );
      },
      error => {
        console.log(<any>error);
      }
    );
  }
}
