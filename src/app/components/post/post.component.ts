import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from '../../models/post';
import { BackendService } from '../../services/backend.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html'
})
export class PostComponent implements OnInit {
  public page_title: string;
  public post : Post;
  public loading: boolean;
  public messageError: string;

  constructor(
    private _activateRotue: ActivatedRoute,
    private bakend: BackendService
  ) {
    this.page_title = '';
    this.loading = true;
    this.messageError = '';
  }

  ngOnInit() {
    this._activateRotue.params.subscribe(
      params => this.getPost(params['id'])
    )
  }
  getPost(id: number): void {
    this.bakend.post(id).subscribe(
      response => {
        this.page_title = response.title;
        this.post = response;
        this.loading = false;
      },
      error => {
        const dataError = error.error.errors;
        this.messageError = (typeof dataError == 'string') ? dataError : JSON.stringify(dataError);
        this.loading = false;
      }
    );
  }

}
