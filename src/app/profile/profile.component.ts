import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../services/user.service'; // Corrija o caminho se necessário
import { CardModule } from 'primeng/card';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';

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

  constructor(private usuarioService: UsuarioService, private router: Router) { }

  ngOnInit(): void {
    this.loadUserProfile(); // Carrega o perfil do usuário ao iniciar
  }

  loadUserProfile(): void {
    const token = localStorage.getItem('token'); // Obtém o token do localStorage
    if (token) {
      const userId = this.extractUserIdFromToken(token); // Extrai o ID do usuário do token
      this.usuarioService.getUser(userId).subscribe(
        response => {
          this.user = response; // Define o objeto user com a resposta do servidor
          this.photoUrl = this.user.foto ? this.user.foto : 'assets/default-avatar.png'; // Atualiza a foto do perfil
        },
        error => {
          console.error('Erro ao carregar perfil', error);
          this.router.navigate(['/login']); // Redireciona para a página de login em caso de erro
        }
      );
    } else {
      this.router.navigate(['/login']); // Redireciona se não houver token
    }
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
}
