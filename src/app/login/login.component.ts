import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { ToolbarModule } from 'primeng/toolbar';
import { AvatarModule } from 'primeng/avatar';
import { PanelModule } from 'primeng/panel';
import { MenuModule } from 'primeng/menu';
import { BadgeModule } from 'primeng/badge';
import { CommonModule } from '@angular/common';
import { ApiService } from '../services/api.service'
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CardModule, FormsModule, InputTextModule, FloatLabelModule, PasswordModule,
    ButtonModule, RippleModule, RouterModule, RouterLink, ToolbarModule, AvatarModule, PanelModule, MenuModule,
    BadgeModule, CommonModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
  email: string = '';
  senha: string = '';
  mensagemErro: string = '';

  constructor(private apiService: ApiService, private router: Router) { }

  login(): void {
    this.apiService.login(this.email, this.senha).subscribe(
      response => {
        localStorage.setItem('token', response.accessToken);
        this.router.navigate(['/profile']); // Ajuste conforme a sua rota
      },
      error => {
        this.mensagemErro = 'Usuário ou senha inválidos';
      }
    );
  }

  irParaRegistro() {
    this.router.navigate(['/app-registro']);
  }
}
