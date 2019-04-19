import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserAuthService } from '../../services/user-auth.service';
import { BackendService } from '../../services/backend.service';
import { User } from 'src/app/models/user';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  public page_title: string;
  public messageError: string;
  public user: User;
  constructor(
    private _user: UserAuthService,
    private backend: BackendService,
    private _route: ActivatedRoute
  ) {
    this.page_title = 'Identifícate';
    this.user = new User (1,'','','','','','','');
    this.messageError = '';
  }

  ngOnInit(): void {
    this.logout();
  }
  onSubmit(loginForm: NgForm): void {
    this.messageError = '';
    this.backend.login(this.user).subscribe(
      response => {
        this._user.login(response);
      },
      error => {
        const dataError = error.error.errors;
        this.messageError = (typeof dataError == 'string') ? dataError : JSON.stringify(dataError);
        console.log(dataError);
        console.log(<any>error);
      }
    );
  }

  logout() {
    this._route.params.subscribe( 
      params => {
        if(params['sure']) {
          this._user.logout();
        }
      }
    );
  }
}
