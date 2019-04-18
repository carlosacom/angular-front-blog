import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {
  public page_title: string;
  constructor() {
    this.page_title = 'Regístrate';
  }

  ngOnInit() {
  }

}
