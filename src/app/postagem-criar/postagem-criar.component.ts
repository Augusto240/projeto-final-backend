import { Component, OnInit } from '@angular/core';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { FileUploadModule, FileUploadEvent } from 'primeng/fileupload';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { BadgeModule } from 'primeng/badge';
import { HttpClientModule } from '@angular/common/http';
import { ProgressBarModule } from 'primeng/progressbar';
import { ToastModule } from 'primeng/toast';
import { UsuarioService } from '../services/user.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PanelModule } from 'primeng/panel';
import { AvatarModule } from 'primeng/avatar';


@Component({
  selector: 'app-postagem-criar',
  standalone: true,
  imports: [FileUploadModule, ButtonModule, CommonModule, BadgeModule, HttpClientModule, ProgressBarModule, ToastModule, FormsModule, PanelModule, AvatarModule],
  templateUrl: './postagem-criar.component.html',
  styleUrls: ['./postagem-criar.component.css'],
  providers: [MessageService, PrimeNGConfig]
})
export class PostagemCriarComponent implements OnInit {
  idUsuario: number | null = null;  // Armazena o ID do usuário
  legenda: string = '';  // Legenda da postagem
  mensagemErro: string = '';
  usuarioNome: string = '';

  constructor(private usuarioService: UsuarioService, private router: Router, private messageService: MessageService) {}
  ngOnInit(): void {
    const token = localStorage.getItem('token');
    console.log('Token:', token); // Verifique o token
    if (token) {
        const decodedToken = this.decodeToken(token);
        this.idUsuario = decodedToken.id;
        this.usuarioNome = decodedToken.nome; // Adiciona o nome do usuário
        console.log('ID do usuário:', this.idUsuario);
        console.log('Nome do usuário:', this.usuarioNome); // Log para verificar o nome
    } else {
        this.mensagemErro = 'Usuário não autenticado';
        console.log(this.mensagemErro);
    }
}

decodeToken(token: string): any {
    const parts = token.split('.');
    if (parts.length !== 3) {
      throw new Error('Token inválido');
    }
    const decoded = atob(parts[1]);
    return JSON.parse(decoded);
}

onSubmit(): void {
  console.log('Método onSubmit chamado'); // Log para verificar se o método é chamado
  console.log('ID do usuário:', this.idUsuario);

  if (this.legenda && this.idUsuario) {
      const postData = {
          descricao: this.legenda, // Envie a descrição diretamente
      };

      this.usuarioService.enviarPostagem(postData, this.idUsuario).subscribe({
          next: (res: any) => {
              console.log('Postagem enviada com sucesso:', res);
              this.router.navigate(['/postagem-lista']);
          },
          error: (err: any) => {
              console.error('Erro ao enviar a postagem:', err);
              this.mensagemErro = 'Erro ao enviar a postagem';
          }
      });
  } else {
      this.mensagemErro = 'É necessário preencher a descrição e estar autenticado.';
      console.log(this.mensagemErro); // Logar mensagem de erro
  }
}



  
}
