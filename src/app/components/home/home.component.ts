import { Component, OnInit } from '@angular/core';
import { Post } from '../../models/post';
import { BackendService } from '../../services/backend.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  public page_title: string;
  public posts: Array<Post>;
  public loading: boolean;
  public dataError: string;
  constructor(
    private backend: BackendService
  ) {
    this.page_title = 'Inicio';
    this.loading = true;
  }

  ngOnInit() {
    this.getPosts();
  }
  getPosts(): void {
    this.backend.posts().subscribe(
      response =>{
        this.posts = response;
        this.loading = false;
        console.log(this.posts);
      },
      error => {
        console.log(<any>error);
        this.loading = false;
        this.dataError = JSON.stringify(error.error.errors);
      }
    );
  }
}
