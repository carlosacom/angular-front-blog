import { Component, OnInit, DoCheck } from '@angular/core';
import { UserAuthService } from '../../../services/user-auth.service';
import { ActivatedRoute } from '@angular/router';
import { BackendService } from '../../../services/backend.service';
import { Category } from '../../../models/category';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit, DoCheck {
  public userIdentity: any;
  public image: string;
  public categories: Array<Category>;
  constructor(
    private _user: UserAuthService,
    private backend: BackendService,
  ) {
    this.image = '';
  }

  ngOnInit() {
    this.userIdentity = this._user.getIdentity();
    this.getImage();
    this.getCategories();
  }
  ngDoCheck() {
    this.userIdentity = this._user.getIdentity();
  }
  getImage() {
    this.backend.user(this.userIdentity.sub).subscribe(
      response => {
        this.image = response.image;
      },
      error => {
        console.log(<any>error);
      }
    );
  }
  getCategories(): void {
    this.backend.categories().subscribe(
      response => {
        this.categories = response;
        console.log(response);
      },
      error => {
        console.log(<any>error);
      }
    );
  }
  
}
