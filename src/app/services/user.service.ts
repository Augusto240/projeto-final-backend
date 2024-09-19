import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
    return this.http.get<any>(`${this.apiUrl}/usuario/${userId}`);
  }
}
