import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../services/user.service'; // Corrija o caminho se necessário
import { CardModule } from 'primeng/card';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { HttpHeaders } from '@angular/common/http';
import { ChangeDetectorRef } from '@angular/core';
@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CardModule, AvatarModule, ButtonModule, CommonModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: any = {}; // Variável para armazenar os dados do usuário
  photoUrl: string = 'assets/default-avatar.png'; // URL padrão caso não tenha foto
  mensagemErro: string = ''; // Mens
  constructor(private usuarioService: UsuarioService, private router: Router, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.loadUserProfile(); // Carrega o perfil do usuário ao iniciar
  }

  loadUserProfile(): void {
    const token = localStorage.getItem('token');
    console.log('Token encontrado:', token); // Verifique se o token está aqui
    if (!token) {
        this.mensagemErro = 'Token não encontrado';
        return;
    }

    const decodedToken = this.decodeToken(token);
    const userId = decodedToken.id; // ou a propriedade que contém o ID do usuário

    this.usuarioService.getUser(userId).subscribe({
      next: (retorno: any) => {
        this.user = retorno; // Armazene os dados do usuário
        this.cdr.detectChanges(); // Força a detecção de mudanças
      },
      error: (erro) => {
        this.mensagemErro = 'Erro ao carregar perfil: ' + erro.message;
      }
    });
  }

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



  extractUserIdFromToken(token: string): number {
    try {
      if (!token) {
        throw new Error('Token não fornecido');
      }

      // Token deve ter três partes: header, payload e signature
      const parts = token.split('.');
      if (parts.length !== 3) {
        throw new Error('Token inválido');
      }

      // Decodifica a parte do payload (base64url para base64)
      const payload = atob(parts[1].replace(/_/g, '/').replace(/-/g, '+'));
      const decodedToken = JSON.parse(payload);

      // Verifique o conteúdo decodificado
      console.log(decodedToken);

      // Certifique-se de que o campo 'id' existe no payload
      if (!decodedToken.id) {
        throw new Error('ID não encontrado no token');
      }

      return decodedToken.id;
    } catch (error) {
      console.error('Erro ao decodificar o token', error);
      return 0; // Valor padrão em caso de erro
    }
  }


  editProfile(): void {
    this.router.navigate(['/edit-profile']); // Redireciona para a página de edição de perfil
  }

  logout(): void {
    localStorage.removeItem('token'); // Remove o token do localStorage
    this.router.navigate(['/login']); // Redireciona para a página de login
  }
  postarAlgo(): void {
    this.router.navigate(['/postagem-criar']).catch(err => {
      console.error('Erro ao navegar para criação de postagem:', err);
      this.mensagemErro = 'Erro ao carregar página de criação de postagem.';
    });
  }
  
}
