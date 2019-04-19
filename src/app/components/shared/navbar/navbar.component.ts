import { Component, OnInit, DoCheck } from '@angular/core';
import { UserAuthService } from '../../../services/user-auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit, DoCheck {
  public userIdentity: any;
  constructor(
    public _user: UserAuthService
  ) { }

  ngOnInit() {
    this.userIdentity = this._user.getIdentity();
  }
  ngDoCheck() {
    this.userIdentity = this._user.getIdentity();
  }
  
}
