import { Routes, RouterModule } from '@angular/router';

// componentes
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { NewCategoryComponent } from './components/new-category/new-category.component';

const ROUTES: Routes = [
    { path: 'inicio', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'logout/:sure', component: LoginComponent },
    { path: 'registro', component: RegisterComponent},
    { path: 'editar-perfil', component: UserEditComponent},
    { path: 'categoria/nueva', component: NewCategoryComponent},
    { path: '**', pathMatch:'full', redirectTo:'inicio' }
];

export const app_routing = RouterModule.forRoot(ROUTES, { useHash: true });