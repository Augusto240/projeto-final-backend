import { Routes } from '@angular/router';
import { RegistroComponent } from './registro/registro.component';
import { LoginComponent } from './login/login.component';
import { PostagemListaComponent } from './postagem-lista/postagem-lista.component';
import { PostagemCriarComponent } from './postagem-criar/postagem-criar.component';
import { ProfileComponent } from './profile/profile.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'app-registro', component: RegistroComponent },
  { path: 'postagens', component: PostagemListaComponent },
  { path: 'postagem-criar', component: PostagemCriarComponent },
  { path: 'profile', component: ProfileComponent },
];

export default routes;
