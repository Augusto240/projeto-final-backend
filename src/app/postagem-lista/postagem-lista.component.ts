import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { CommonModule } from '@angular/common';
import { AvatarModule } from 'primeng/avatar';
import { PanelModule } from 'primeng/panel';
import { Postagem } from '../../models/models'; // Atualize o caminho conforme necessário

@Component({
  selector: 'app-postagem-lista',
  standalone: true,
  imports: [CommonModule, AvatarModule, PanelModule],
  templateUrl: './postagem-lista.component.html',
  styleUrls: ['./postagem-lista.component.css']
})
export class PostagemListaComponent implements OnInit {
  postagens: Postagem[] = [];

  constructor(private apiService: ApiService) { }
  

  ngOnInit() {
    this.apiService.getPostagens().subscribe(
      postagens => {
        console.log('Postagens carregadas:', postagens);
      },
      error => {
        console.error('Erro ao carregar postagens:', error);
      }
    );
  }
}

