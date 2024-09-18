import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-postagem-lista',
  standalone: true,
  imports: [TableModule, CommonModule],
  templateUrl: './postagem-lista.component.html',
  styleUrls: ['./postagem-lista.component.css']
})
export class PostagemListaComponent implements OnInit {
  postagens: any[] = [];

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getPostagens().subscribe(
      data => this.postagens = data,
      error => console.error('Erro ao carregar postagens', error)
    );
  }
}
