import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { UsuarioService } from '../services/user.service';
import { CardModule } from 'primeng/card';
import { FloatLabelModule } from 'primeng/floatlabel';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FileUploadModule } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css'],
  imports: [CardModule, FloatLabelModule, CommonModule, FormsModule, PasswordModule, ButtonModule, InputTextModule, FileUploadModule, ToastModule],
  providers: [MessageService]
})
export class EditProfileComponent implements OnInit {
  usuario: any = {
    id: null,
    nome: '',
    email: '',
    senha: ''
  };
  mensagemErro: string = '';

  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private messageService: MessageService,
    private cdr: ChangeDetectorRef
  ) {}
  
  ngOnInit(): void {
    this.loadUserProfile(); // Chama a função para carregar o perfil do usuário
  }
  
  loadUserProfile(): void {
    const token = localStorage.getItem('token');
    console.log('Token encontrado:', token); // Verifique se o token está aqui
    if (!token) {
        this.mensagemErro = 'Token não encontrado';
        return;
    }
  
    const userId = this.extractUserIdFromToken(token); // Chame a função para extrair o ID
    console.log('ID do usuário extraído:', userId); // Verifique se o ID está sendo extraído corretamente
  
    if (!userId) {
        this.mensagemErro = 'ID do usuário não encontrado';
        return;
    }
  
    this.usuarioService.getUser(userId).subscribe({
      next: (retorno: any) => {
        this.usuario = retorno; // Armazene os dados do usuário
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


  atualizarUsuario() {
    console.log('Atualizando usuário:', this.usuario);
    console.log('Atualizando usuário com ID:', this.usuario.id);
    this.usuarioService.atualizarUsuario(this.usuario, localStorage.getItem('token')!).subscribe({
      next: () => {
        this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Perfil atualizado com sucesso!' });
        this.router.navigate(['/perfil']); // Redirecionar para a página de perfil
      },
      error: (err) => {
        console.error('Erro ao atualizar o perfil:', err); // Log do erro
        this.mensagemErro = 'Erro ao atualizar o perfil';
      }
    });
  }
  

  onUpload(event: any) {
    // Trate o evento de upload, se necessário
    this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Imagem carregada com sucesso!' });
  }

  onUploadError(event: any) {
    this.mensagemErro = 'Erro ao carregar a imagem';
  }
}