import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiUrl = 'http://localhost:3000/api'; // URL correta para obter usuário

  constructor(private http: HttpClient) { }

  registrarUsuario(usuarioData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/criar`, usuarioData);
  }

  getUser(userId: number): Observable<any> {
    // Obtém o token do localStorage
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    // Envia a requisição com o header de autorização
    return this.http.get<any>(`${this.apiUrl}/usuario/${userId}`, { headers });
  }

  enviarPostagem(postagemData: FormData, userId: number): Observable<any> {
    console.log('Enviando postagem:', postagemData); // Log para verificar dados enviados
    console.log('Enviando postagem:', postagemData.get('foto')); // Verifique se a imagem está sendo enviada
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    
    return this.http.post<any>(`${this.apiUrl}/poste/${userId}`, postagemData, { headers });
    
  }
    
  criarPostagem(postagem: any, token: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/poste/${postagem.idUsuario}`, postagem, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }
  atualizarUsuario(usuario: any, token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.put<any>(`http://localhost:3000/api/usuario/${usuario.id}`, usuario, { headers });
  }
  
  
  
}


