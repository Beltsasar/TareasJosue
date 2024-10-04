import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/todos';  // URL de la API

  constructor(private http: HttpClient) { }

  // Obtener una lista de usuarios (incluyendo sus imágenes)
  getTareas(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}