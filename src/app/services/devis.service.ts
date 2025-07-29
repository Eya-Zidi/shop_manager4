import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { config } from '../app.config';

@Injectable({
  providedIn: 'root'
})
export class DevisService {
  private apiUrl = config.apiUrl;

  constructor(private http: HttpClient) {}

  addDevis(data: FormData): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/add-demande.php`, data, {
      withCredentials: true
    });
  }

  getDevis(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/get-devis.php`, {
      withCredentials: true
    });
  }
}
