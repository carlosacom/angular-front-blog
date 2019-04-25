import { Component, OnInit } from '@angular/core';
import { UserAuthService } from '../../services/user-auth.service';
import { BackendService } from '../../services/backend.service';
import { Category } from '../../models/category';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-category',
  templateUrl: './new-category.component.html'
})
export class NewCategoryComponent implements OnInit {
  public page_title: string;
  public category: Category;
  constructor(
    private _user: UserAuthService,
    private backend: BackendService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router
  ) {
    this.page_title = 'Crear Nueva Categoría';
    this.category = new Category(0,'');
  }

  ngOnInit() {
  }
  onSubmit(form: NgForm): void {
    console.log(this.category);
    this.backend.newCategory(this.category).subscribe(
      response => {
        Swal.fire({
          type: 'success',
          title: 'Exito!!',
          text: `Se agregó la categoría '${response.name}' al sistema`
        });
        console.log(response);
      },
      error => {
        Swal.fire({
          type: 'error',
          title: 'Hubo un error',
          text: JSON.stringify(error.error.errors)
        });
      }
    );
  }
}
