import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../services/user.service'; // Ajuste o caminho conforme necessário
import { CardModule } from 'primeng/card';
import { FloatLabelModule } from 'primeng/floatlabel';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MessageService } from 'primeng/api';
import { FileUploadModule } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CardModule, FloatLabelModule, CommonModule, FormsModule, PasswordModule, ButtonModule, InputTextModule, FileUploadModule, ToastModule],
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
  providers: [MessageService]
})
export class RegistroComponent {
  nome: string = '';
  email: string = '';
  senha: string = '';
  foto: File | null = null;

  constructor(private usuarioService: UsuarioService, private router: Router, private messageService: MessageService) { }

  onFileChange(event: any): void {
    this.foto = event.target.files[0];
  }

  onUpload(event: any) {
    this.messageService.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded with Basic Mode' });
  }

  onUploadError(event: any) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'File Upload Failed' });
  }

  onSubmit(): void {
    const formData = new FormData();
    formData.append('nome', this.nome);
    formData.append('email', this.email);
    formData.append('senha', this.senha);
    if (this.foto) {
      formData.append('foto', this.foto);
    }

    this.usuarioService.registrarUsuario(formData).subscribe({
      next: (response) => {
        console.log('Usuário registrado com sucesso!', response);
        this.router.navigate(['/login']); // Redireciona para a página de login
      },
      error: (error) => {
        console.error('Erro ao registrar usuário', error);
      }
    });
  }
}
