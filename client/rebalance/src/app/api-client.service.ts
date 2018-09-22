import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiClientService {
  private baseUrl: string = 'http://localhost:3002/rebalance';
  private dataSource = new BehaviorSubject('');
  currentMessage = this.dataSource.asObservable();

  constructor(
    private http: HttpClient
  ) { }

  getUserPortfolio (username): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}`, {
      headers: {
        'x-user': username
      }
    });
  }

  sendData(data: string) {
    this.dataSource.next(data);
  }
}
