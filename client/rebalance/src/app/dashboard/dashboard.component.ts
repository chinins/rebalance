import { Component, OnInit } from '@angular/core';
import { ApiClientService } from '../api-client.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit {
  user: object [];

  constructor(
    private client: ApiClientService
  ) { }

  ngOnInit() {
    this.getUserPortfolio();
  }

  getUserPortfolio (): void {
    this.client.getUserPortfolio('sobaka')
      .subscribe(userData => {
        const { _id, username, ...filtered } = userData;
        console.log(userData);
        console.log(filtered);
        console.log(Object.keys(filtered));
        return this.user = Object.values(filtered);
      });
  }

}
