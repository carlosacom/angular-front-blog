import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../../models/user';
import { UserAuthService } from '../../services/user-auth.service';
import { BackendService } from '../../services/backend.service';
import swal from 'sweetalert2';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html'
})
export class UserEditComponent implements OnInit {
  public page_title: string;
  public user: User;
  public loading: boolean;
  public froalaOtions: any;
  public afuConfig: Object;
  constructor(
    private backend: BackendService,
    private _user: UserAuthService
  ) {
    this.page_title = 'Ajustes de Perfil';
    this.user = new User (1,'','','','','','','');
    this.loading = false;
    this.afuConfig = {
      multiple: false,
      formatsAllowed: ".jpg,.png",
      maxSize: "1",
      uploadAPI:  {
        url:`${environment.urlBackend}/user/upload`,
        headers: {
          "Authorization" : this._user.getToken()
        }
      },
      theme: "attachPin",
      hideProgressBar: false,
      hideResetBtn: true,
      hideSelectBtn: false,
      attachPinText: "Sube tu Imagen de usuario",
    };
  }

  ngOnInit(): void {
    this.get_user();
    this.froalaOtions = {
      charCounterCount: true,
      toolbarButtons: ['bold', 'italic', 'underline', 'paragraphFormat','alert'],
      toolbarButtonsXS: ['bold', 'italic', 'underline', 'paragraphFormat','alert'],
      toolbarButtonsSM: ['bold', 'italic', 'underline', 'paragraphFormat','alert'],
      toolbarButtonsMD: ['bold', 'italic', 'underline', 'paragraphFormat','alert'],
    };
  }
  get_user(): void {
    const user = this._user.getIdentity();
    this.backend.user(user.sub).subscribe(
      response => {
        this.user = response;
      },
      error => {
        console.log(<any> error);
      }
    );
  }
  onSubmit(userForm: NgForm): void {
    this.loading = true;
    this.user.role = undefined;
    this.backend.editUser(this.user).subscribe(
      response => {
        swal.fire({
          type: 'success',
          title: 'Éxito!',
          text: 'Se ha Actualizado tu perfil correctamente.'
        });
        this.loading = false;
        this.user = response;
      },
      error => {
        swal.fire({
          type: 'error',
          title: 'Hubo un error!',
          text: JSON.stringify(error['error'].errors)
        });
        this.loading = false;
      }
    );
  }
  AvatarUpload(dataImage: any): void {
    console.log(dataImage);
    const response = JSON.parse(dataImage.response);
    if (dataImage.status == 200) {
      this.user.image = response.image;
    }
  }
}
