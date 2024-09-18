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
  user: any = {};
  photoUrl: string = 'assets/default-avatar.png'; // URL padrão caso não tenha foto

  constructor(private usuarioService: UsuarioService, private router: Router) { }

  ngOnInit(): void {
    this.loadUserProfile();
  }

  loadUserProfile(): void {
    const token = localStorage.getItem('token');
    if (token) {
      const userId = this.extractUserIdFromToken(token);
      this.usuarioService.getUser(userId).subscribe(
        response => {
          this.user = response;
          this.photoUrl = this.user.foto ? this.user.foto : 'assets/default-avatar.png'; // Atualize a URL da foto
        },
        error => {
          console.error('Erro ao carregar perfil', error);
          this.router.navigate(['/login']);
        }
      );
    } else {
      this.router.navigate(['/login']);
    }
  }

  extractUserIdFromToken(token: string): number {
    const decodedToken: any = jwt_decode(token);
    return decodedToken.userId; // Ajuste conforme a estrutura do seu token
  }

  editProfile(): void {
    this.router.navigate(['/edit-profile']);
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}

function jwt_decode(token: string): any {
  throw new Error('Function not implemented.');
}

