import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiClientService {
  private baseUrl: string = 'http://localhost:3002';
  private dataSource = new BehaviorSubject('');
  currentMessage = this.dataSource.asObservable();

  constructor(
    private http: HttpClient
  ) { }

  getUserPortfolio (username): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/rebalance`, {
      headers: {
        'x-user': username
      }
    });
  }

  postIndexData (indexFund, username): Observable<object> {
    return this.http.post(`${this.baseUrl}/portfolio`, indexFund, {
      headers: {
        'x-user': username,
      }
    });
  }

  createUser (username): Observable<any> {
    return this.http.post(`${this.baseUrl}/user`, {
        'username': `${username}`
    });
  }

  sendData(data: string) {
    this.dataSource.next(data);
  }
}
