import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiClientService {
  private baseUrl: String = 'http://localhost:3002';
  private dataSource = new BehaviorSubject('');
  currentMessage = this.dataSource.asObservable();

  constructor(
    private http: HttpClient
  ) { }

  getUserPortfolio (username): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/portfolio`, {
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

  rebalance (username): Observable<any> {
    return this.http.get(`${this.baseUrl}/rebalance`, {
      headers: {
        'x-user': username,
      }
    });
  }

  confirmRebalance (username): Observable<any> {
    return this.http.get(`${this.baseUrl}/confirm`, {
      headers: {
        'x-user': username,
      }
    });
  }

  addInvestment (username, investment): Observable<any> {
    return this.http.post(`${this.baseUrl}/extra`, investment, {
      headers: {
        'x-user': username,
      }
    });
  }

  sendData(data: string) {
    this.dataSource.next(data);
  }
}
