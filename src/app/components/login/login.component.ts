import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  public page_title: string;
  constructor() {
    this.page_title = 'Identifícate';
  }

  ngOnInit() {
  }

}
