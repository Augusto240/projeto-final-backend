import { Routes } from '@angular/router';
import { RegistroComponent } from './registro/registro.component';
import { LoginComponent } from './login/login.component';
import { PostagemListaComponent } from './postagem-lista/postagem-lista.component';
import { PostagemCriarComponent } from './postagem-criar/postagem-criar.component';
import { ProfileComponent } from './profile/profile.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'app-registro', component: RegistroComponent },
  { path: 'postagens', component: PostagemListaComponent },
  { path: 'postagem-criar', component: PostagemCriarComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'app-profile', component: ProfileComponent },
  { path: 'perfil', component: ProfileComponent },
  { path: 'edit-profile', component: EditProfileComponent }
];

export default routes;
