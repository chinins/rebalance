import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiClientService } from '../api-client.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit {
  user: {
    bonds: object [],
    stocks: object []
  };
  username;

  constructor(
    private client: ApiClientService,
    private route: ActivatedRoute,
  ) {
    this.route.params.subscribe(params => {
      this.username = params.username;
    });
  }

  ngOnInit() {
    this.getUserPortfolio();
  }

  getUserPortfolio (): void {
    this.client.getUserPortfolio(this.username)
    .subscribe(userData => {
      let { _id, username, ...filtered } = userData;
      filtered = Object.values(filtered);
      const bonds = filtered.filter(el => el.type === 'bonds');
      const stocks = filtered.filter(el => el.type === 'stocks');
        this.user = {
          bonds,
          stocks
        };
        this.client.sendData(JSON.stringify(this.user));
      });
  }
}
