import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiClientService {
  private baseUrl: string = 'http://localhost:3002/rebalance';

  constructor(
    private http: HttpClient
  ) { }

  getUserPortfolio (): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}`, {
      headers: {
        'x-user': 'sobaka'
      }
    });
  }
}
