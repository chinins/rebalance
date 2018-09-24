import { Component, OnInit, OnChanges } from '@angular/core';
import { Observable } from 'rxjs';
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

  constructor(
    private client: ApiClientService
  ) { }

  ngOnInit() {
    this.getUserPortfolio();

  }

  onChanges() {
    // this.getUserPortfolio();
  }

  getUserPortfolio (): void {

    this.client.getUserPortfolio('sobaka')
    .subscribe(userData => {
      let { _id, username, ...filtered } = userData;
      filtered = Object.values(filtered);
      const bonds = filtered.filter(el => el.type === 'bonds');
      const stocks = filtered.filter(el => el.type === 'stocks');
      console.log('got here');
        this.user = {
          bonds,
          stocks
        };
        this.client.sendData(JSON.stringify(this.user));
      });
  }

  // getBonds (arr): void {
  //   this.bonds = arr.filter(el => el.type === 'bonds');
  //   console.log(this.bonds);
  //   return this.bonds;
  // }
}
