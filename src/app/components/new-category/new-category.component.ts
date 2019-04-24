import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-category',
  templateUrl: './new-category.component.html'
})
export class NewCategoryComponent implements OnInit {
  public page_title: string;
  constructor() {
    this.page_title = 'Nueva Categoría';
  }

  ngOnInit() {
  }

}
