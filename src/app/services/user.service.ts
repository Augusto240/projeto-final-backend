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

  enviarPostagem(postagemData: FormData): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  
    return this.http.post<any>(`${this.apiUrl}/postagem/criar`, postagemData, { headers });
  }
  
}
