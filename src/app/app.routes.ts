import { Routes } from '@angular/router';
import { RegistroComponent } from './registro/registro.component'
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
    { path: '', redirectTo: 'app-login', pathMatch: 'full' },
    { path: 'app-registro', component: RegistroComponent },
    { path: 'app-login', component: LoginComponent },
    { path: 'app-home', component: HomeComponent}
];
