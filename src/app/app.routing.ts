import { Routes, RouterModule } from '@angular/router';

// componentes
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';

const ROUTES: Routes = [
    { path: 'inicio', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'registro', component: RegisterComponent},
    { path: '**', pathMatch:'full', redirectTo:'inicio' }
];

export const app_routing = RouterModule.forRoot(ROUTES, { useHash: true });