import { Component, OnInit, Input } from '@angular/core';
import { Post } from '../../models/post';

@Component({
  selector: 'app-card-post',
  templateUrl: './card-post.component.html'
})
export class CardPostComponent implements OnInit {
  @Input() public post: Post;
  constructor() { }

  ngOnInit() {
    console.log(this.post);
  }

}
