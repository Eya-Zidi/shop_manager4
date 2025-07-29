import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { config } from '../app.config';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private apiUrl = config.apiUrl;

  constructor(private http: HttpClient) {}


  createAccount(formData: FormData): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/add_account.php`, formData, {
      withCredentials: true 
    });
  }


  getAllUsers(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/get_account.php`, {
      withCredentials: true
    });
  }


  updateUserStatus(userId: number, status: string): Observable<any> {
    const body = new FormData();
    body.append('userId', userId.toString());
    body.append('status', status);

    return this.http.post<any>(`${this.apiUrl}/update_user_status.php`, body, {
      withCredentials: true
    });
  }
}
