import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { CommonModule } from '@angular/common';
import { AvatarModule } from 'primeng/avatar';
import { Postagem } from '../../models/models'; // Atualize o caminho conforme necessário
import { CardModule } from 'primeng/card';
import { MenubarModule } from 'primeng/menubar';
import { BadgeModule } from 'primeng/badge';
import { Router } from '@angular/router';

@Component({
  selector: 'app-postagem-lista',
  standalone: true,
  imports: [CommonModule, AvatarModule, CardModule, MenubarModule, BadgeModule],
  templateUrl: './postagem-lista.component.html',
  styleUrls: ['./postagem-lista.component.css']
})
export class PostagemListaComponent implements OnInit {
  postagens: Postagem[] = [];
  items = [
    { label: 'Home', icon: './favicon.ico', routerLink: '/postagem-lista' },
    { label: 'Perfil', icon: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2F17%2F96%2F87%2F179687493bbd6c100f966f8bace30735.jpg&f=1&nofb=1', routerLink: '/perfil' },
    { label: 'Logout', icon: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fstatic.vecteezy.com%2Fsystem%2Fresources%2Fpreviews%2F000%2F426%2F390%2Foriginal%2Flogout-icon-vector-illustration.jpg&f=1&nofb=1&ipt=4c5032ff14e6b4d08adebf3b30f5e6545f46c2d8f3150d0076f0eb5b294ab15c&ipo=images', routerLink: '/login' }
  ];

  constructor(private apiService: ApiService, private router: Router) { }
  

  ngOnInit() {
    this.apiService.getPostagens().subscribe(
      postagens => {
        console.log('Postagens carregadas:', postagens);
        this.postagens = postagens; // Atribua as postagens à variável
      },
      error => {
        console.error('Erro ao carregar postagens:', error);
      }
    );
  }
  logout(): void {
    localStorage.removeItem('token'); // Remove o token do localStorage
    this.router.navigate(['/login']); // Redireciona para a página de login
  }
  
}

