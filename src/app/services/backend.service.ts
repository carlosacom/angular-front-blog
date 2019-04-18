import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user';
import { UserAuthService } from './user-auth.service';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  urlBackend: string;
  constructor(
    private http: HttpClient,
    private user: UserAuthService
  ) {
    this.urlBackend = 'http://localhost:8000';
  }

  // queries que se consumen
  getQuery(path) {
    const url = `${this.urlBackend}${path}`;
    return this.http.get(url);
  }

  postQuery(path: string, data: any, token: boolean = false, ) {
    const url = `${this.urlBackend}${path}`;
    const params = JSON.stringify(data);
    const headers: HttpHeaders = (token) ? new HttpHeaders().set('Content-Type', 'application/json').set('authorization', this.user.getToken() ) : new HttpHeaders().set('Content-Type', 'application/json') ;
    return this.http.post(url, params, { headers });
  }
  putQuery(path: string, data: any ) {
    const url = `${this.urlBackend}${path}`;
    const params = JSON.stringify(data);
    const headers: HttpHeaders = new HttpHeaders().set('Content-Type', 'application/json').set('authorization', this.user.getToken());
    return this.http.put(url, params, { headers });
  }
  // metodos que consumen http
  register(newUser: User) {
    return this.postQuery('/register', newUser)
  }
  login(user: User) {
    return this.postQuery('/login', user)
  }
  test() {
    return this.getQuery('/posts')
  }
  posts() {
    return this.getQuery('/posts')
  }
  post(id: number) {
    return this.getQuery(`/posts/${id}`)
  }
}