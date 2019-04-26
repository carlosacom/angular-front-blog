import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user';
import { UserAuthService } from './user-auth.service';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Category } from '../models/category';
import { Post } from '../models/post';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  urlBackend: string;
  constructor(
    private http: HttpClient,
    private _user: UserAuthService
  ) {
    this.urlBackend = environment.urlBackend;
  }

  // queries que se consumen
  private getQuery (path: string, token: boolean = false ): Observable<any> {
    const url = `${this.urlBackend}${path}`;
    if (token) {
      const headers: HttpHeaders = new HttpHeaders().set('authorization', this._user.getToken());
      return this.http.get(url, { headers });
    } else {
      return this.http.get(url);
    }
  }

  private postQuery (path: string, data: any, token: boolean = false, ): Observable<any> {
    const url = `${this.urlBackend}${path}`;
    const params = JSON.stringify(data);
    const headers: HttpHeaders = (token) ? new HttpHeaders().set('Content-Type', 'application/json').set('authorization', this._user.getToken() ) : new HttpHeaders().set('Content-Type', 'application/json') ;
    return this.http.post(url, params, { headers });
  }
  private putQuery (path: string, data: any ): Observable<any> {
    const url = `${this.urlBackend}${path}`;
    const params = JSON.stringify(data);
    const headers: HttpHeaders = new HttpHeaders().set('Content-Type', 'application/json').set('authorization', this._user.getToken());
    return this.http.put(url, params, { headers });
  }
  // metodos que consumen http
  register (newUser: User): Observable<any> {
    return this.postQuery('/register', newUser)
  }
  login (user: User): Observable<any> {
    return this.postQuery('/login', user)
  }
  user (id: number): Observable<any> {
    return this.getQuery(`/user/${id}`, true)
  }
  editUser (user: User): Observable<any> {
    return this.putQuery('/user', user);
  }
  test (): Observable<any> {
    return this.getQuery('/posts')
  }
  posts (): Observable<any> {
    return this.getQuery('/posts')
  }
  post (id: number): Observable<any> {
    return this.getQuery(`/posts/${id}`)
  }
  newPost (post: Post) :Observable<any> {
    return this.postQuery('/posts',post,true)
  }
  newCategory (category: Category): Observable<any> {
    return this.postQuery('/category', category, true)
  }
  categories (): Observable<any> {
    return this.getQuery('/category')
  }
}