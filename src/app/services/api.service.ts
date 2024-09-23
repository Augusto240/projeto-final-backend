import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { forkJoin, map, mergeMap } from 'rxjs';
import { Postagem, Usuario } from '../../models/models';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  login(email: string, senha: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { email, senha });
  }

  registrarUsuario(usuario: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/criar`, usuario);
  }

  getToken(): string {
    return localStorage.getItem('token') || ''; // ou qualquer outro método que você use
  }
  
  getPostagens(): Observable<Postagem[]> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.getToken()}`
    });
  
    return this.http.get<Postagem[]>(`${this.apiUrl}/poste`, { headers }).pipe(
      mergeMap(postagens => 
        forkJoin(
          postagens.map(postagem => 
            this.http.get<Usuario>(`${this.apiUrl}/usuarios/${postagem.idUsuario}`, { headers }).pipe(
              map(usuario => ({ ...postagem, usuario }))
            )
          )
        ) as Observable<Postagem[]> // Aqui
      )
    );
  }
  

  

  getPostagensByUsuario(idUsuario: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/poste/${idUsuario}`);
  }

  criarPostagem(postagem: any, token: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/poste/${postagem.idUsuario}`, postagem, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  atualizarPostagem(postagem: any, token: string): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/poste/${postagem.id}`, postagem, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  deletarPostagem(id: number, token: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/poste/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  atualizarUsuario(usuario: any, token: string): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/usuario/${usuario.id}`, usuario, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }
  getUserProfile(): Observable<any> {
    const userId = localStorage.getItem('userId');
    return this.http.get<any>(`${this.apiUrl}/usuario/${userId}`);
  }
  

}
