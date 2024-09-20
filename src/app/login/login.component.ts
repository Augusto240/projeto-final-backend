import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { RouterModule, Router } from '@angular/router';
import { ToolbarModule } from 'primeng/toolbar';
import { AvatarModule } from 'primeng/avatar';
import { PanelModule } from 'primeng/panel';
import { MenuModule } from 'primeng/menu';
import { BadgeModule } from 'primeng/badge';
import { CommonModule } from '@angular/common';
import { ApiService } from '../services/api.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CardModule,
    FormsModule,
    InputTextModule,
    FloatLabelModule,
    PasswordModule,
    ButtonModule,
    RippleModule,
    RouterModule,
    ToolbarModule,
    AvatarModule,
    PanelModule,
    MenuModule,
    BadgeModule,
    CommonModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']  // Correção de styleUrl para styleUrls
})
export class LoginComponent {
  email: string = '';
  senha: string = '';
  mensagemErro: string = '';

  constructor(private apiService: ApiService, private router: Router) { }

  decodeToken(token: string): any {
    if (!token) {
      throw new Error('Token não fornecido');
    }
    const parts = token.split('.');
    if (parts.length !== 3) {
      throw new Error('Token inválido');
    }
    const decoded = atob(parts[1]);
    return JSON.parse(decoded);
  }

  login(): void {
    this.mensagemErro = '';

    this.apiService.login(this.email, this.senha).subscribe({
      next: (retorno: any) => {
        console.log(retorno);
        if (retorno.acessToken) {
          localStorage.setItem('token', retorno.acessToken);
          this.router.navigate(['/']);
        } else {
          this.mensagemErro = 'Token não encontrado na resposta.';
        }
      },
      error: (erro: HttpErrorResponse) => {
        this.mensagemErro = erro.error.mensagemerro;
      }
      });
      this.router.navigate(['/profile']);
  }




  irParaRegistro() {
    this.router.navigate(['/app-registro']);
  }
}
