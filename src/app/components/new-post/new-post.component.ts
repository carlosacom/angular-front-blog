import { Component, OnInit } from '@angular/core';
import { Params, Router } from '@angular/router';
import { UserAuthService } from '../../services/user-auth.service';
import { BackendService } from '../../services/backend.service';
import { Post } from '../../models/post';
import { Category } from 'src/app/models/category';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html'
})
export class NewPostComponent implements OnInit {
  public page_title: string;
  public loading: boolean;
  public post: Post;
  public categories: Array<Category>;
  public afuConfig: Object;
  public froalaOtions: Object;
  constructor(
    private _user: UserAuthService,
    private backend: BackendService,
    private _router: Router
  ) {
    this.page_title = 'Crear Nuevo Post';
    this.loading = false;
    this.post = new Post(0,this._user.getIdentity().sub,0,'','','',null);
    this.afuConfig = {
      multiple: false,
      formatsAllowed: ".jpg,.png",
      maxSize: "1",
      uploadAPI:  {
        url:`${environment.urlBackend}/posts/upload`,
        headers: {
          "Authorization" : this._user.getToken()
        }
      },
      theme: "attachPin",
      hideProgressBar: false,
      hideResetBtn: true,
      hideSelectBtn: false,
      attachPinText: "Sube tu Imagen del post",
    };
    this.froalaOtions = {
      charCounterCount: true,
      toolbarButtons: ['bold', 'italic', 'underline', 'paragraphFormat','alert'],
      toolbarButtonsXS: ['bold', 'italic', 'underline', 'paragraphFormat','alert'],
      toolbarButtonsSM: ['bold', 'italic', 'underline', 'paragraphFormat','alert'],
      toolbarButtonsMD: ['bold', 'italic', 'underline', 'paragraphFormat','alert'],
    };
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
  onSubmit(form: NgForm): void {
    this.loading = true;
    this.backend.newPost(this.post).subscribe(
      response => {
        Swal.fire({
          type: 'success',
          title: 'Éxito!',
          text: `Se ha publicado correctamente el post : ${response.title}`
        });
        this.loading = false;
        // form.reset();
        // this.post = new Post(0,this._user.getIdentity().sub,0,'','','',null);
        this._router.navigate(['/post', response.id]);
      },
      error => {
        Swal.fire({
          type: 'error',
          title: 'Hubo un error',
          text: JSON.stringify(error.error.errors)
        });
        this.loading = false;

      } 
    );
  }
  imageUpload(dataImage: any): void {
    console.log(dataImage);
    console.log(dataImage.response);
    if (dataImage.status == 200) {
      const response = JSON.parse(dataImage.response);
      this.post.image = response.image;
    }
  }

}
