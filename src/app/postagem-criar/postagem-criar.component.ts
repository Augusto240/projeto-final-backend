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

@Component({
  selector: 'app-postagem-criar',
  standalone: true,
  imports: [FileUploadModule, ButtonModule, CommonModule, BadgeModule, HttpClientModule, ProgressBarModule, ToastModule, FormsModule],
  templateUrl: './postagem-criar.component.html',
  styleUrls: ['./postagem-criar.component.css'],
  providers: [MessageService, PrimeNGConfig]
})
export class PostagemCriarComponent implements OnInit {
  idUsuario: number | null = null;  // Armazena o ID do usuário
  legenda: string = '';  // Legenda da postagem
  selectedFile: File | null = null;  // Arquivo de imagem
  mensagemErro: string = '';

  constructor(private usuarioService: UsuarioService, private router: Router, private messageService: MessageService) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = this.decodeToken(token);
      this.idUsuario = decodedToken.id;
      console.log('ID do usuário:', this.idUsuario); // Verifique se o ID é exibido corretamente
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

  onUpload(event: FileUploadEvent) {
    if (event.files && event.files.length > 0) {
      this.selectedFile = event.files[0];
      console.log('Arquivo selecionado:', this.selectedFile);
      this.messageService.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded with Basic Mode' });
    } else {
      console.log('Nenhum arquivo selecionado');
  } 
}


  onSubmit(): void {
    console.log('Método onSubmit chamado'); // Log para verificar se o método é chamado
    console.log('Arquivo selecionado:', this.selectedFile);
    console.log('ID do usuário:', this.idUsuario);
    if (this.selectedFile && this.idUsuario) {
      console.log('Arquivo selecionado:', this.selectedFile);
      console.log('ID do usuário:', this.idUsuario);
  
      const formData = new FormData();
      formData.append('foto', this.selectedFile);
      formData.append('legenda', this.legenda);
  
      this.usuarioService.enviarPostagem(formData, this.idUsuario!).subscribe({
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
      this.mensagemErro = 'É necessário selecionar uma imagem e estar autenticado.';
      console.log(this.mensagemErro); // Logar mensagem de erro
    }
    error: (err: any) => {  console.error('Erro ao enviar a postagem:', err);  this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao enviar a postagem' });}
  }
  
}
