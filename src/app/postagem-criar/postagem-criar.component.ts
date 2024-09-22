import { Component, OnInit } from '@angular/core';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { FileUploadModule } from 'primeng/fileupload';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { BadgeModule } from 'primeng/badge';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ProgressBarModule } from 'primeng/progressbar';
import { ToastModule } from 'primeng/toast';
import { UsuarioService } from '../services/user.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';  // Adicionando FormsModule

@Component({
  selector: 'app-postagem-criar',
  standalone: true,
  imports: [FileUploadModule, ButtonModule, CommonModule, BadgeModule, HttpClientModule, ProgressBarModule, ToastModule, FormsModule],
  templateUrl: './postagem-criar.component.html',
  styleUrl: './postagem-criar.component.css',
  providers: [MessageService, PrimeNGConfig]
})
export class PostagemCriarComponent implements OnInit {
  idUsuario: number | null = null;  // Armazena o ID do usuário
  legenda: string = '';  // Legenda da postagem
  selectedFile: File | null = null;  // Arquivo de imagem
  mensagemErro: string = '';

  constructor(private usuarioService: UsuarioService, private router: Router) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token) {
      // Decodifica o token para obter o ID do usuário
      const decodedToken = this.decodeToken(token);
      this.idUsuario = decodedToken.id;  // Ou use o nome correto da chave que contém o ID
    } else {
      this.mensagemErro = 'Usuário não autenticado';
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

  onSelectFile(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  onSubmit(): void {
    if (this.selectedFile && this.idUsuario) {
      const formData = new FormData();
      formData.append('foto', this.selectedFile);
      formData.append('legenda', this.legenda);
      formData.append('idUsuario', this.idUsuario.toString());

      // Agora você pode enviar o formData para o servidor
      this.usuarioService.enviarPostagem(formData).subscribe({
        next: (res: any) => {
          console.log('Postagem enviada com sucesso:', res);
          this.router.navigate(['/postagem-lista']); // Navega para a página de listagem de postagens
        },
        error: (err: any) => {
          console.error('Erro ao enviar a postagem:', err);
          this.mensagemErro = 'Erro ao enviar a postagem';
        }
      });
    } else {
      this.mensagemErro = 'É necessário selecionar uma imagem e estar autenticado.';
    }
  }
}
