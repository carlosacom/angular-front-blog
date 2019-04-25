import { Component, OnInit } from '@angular/core';
import { Params } from '@angular/router';
import { UserAuthService } from '../../services/user-auth.service';
import { BackendService } from '../../services/backend.service';
import { Post } from '../../models/post';
import { Category } from 'src/app/models/category';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html'
})
export class NewPostComponent implements OnInit {
  public page_title: string;
  public post: Post;
  public categories: Array<Category>;
  constructor(
    private _user: UserAuthService,
    private backend: BackendService
  ) {
    this.page_title = 'Crear Nuevo Post';
    this.post = new Post(0,this._user.getIdentity().sub,0,'','','',null);
  }
  ngOnInit() {
    // console.log(this.post);
    this.getcategories();
  }
  getcategories(): void {
    this.backend.categories().subscribe(
      response => this.categories = response,
      error => console.log(<any>error)
    );
  }

}
