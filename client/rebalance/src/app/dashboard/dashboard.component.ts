import { Component, OnInit } from '@angular/core';
import { ApiClientService } from '../api-client.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit {
  user: {};

  constructor(
    private client: ApiClientService
  ) { }

  ngOnInit() {
    this.getUserPortfolio();
    // console.log(this.user);
  }

  getUserPortfolio (): void {
    this.client.getUserPortfolio()
      .subscribe(userData => console.log(userData));
  }

}
