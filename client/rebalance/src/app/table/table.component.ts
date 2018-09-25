import { Component, OnInit, Input } from '@angular/core';
import { ApiClientService } from '../api-client.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.sass']
})
export class TableComponent implements OnInit {
  // @Input() user: {
  //   bonds: {}[]
  //   stocks: {}[]
  // }[];
  displayedColumns: string[] = ['name', 'value', 'target', 'current-allocation'];
  data: object;
  username: string;
  confirmed: boolean;

  getTotal (arr, key): number {
    return arr.reduce((acc, el) => acc + el[key], 0);
  }

  constructor(
    private client: ApiClientService,
    private route: ActivatedRoute
  ) {
    this.route.parent.params.subscribe(params => this.username = params.username);
    this.route.params.subscribe(params => this.confirmed = params.confirmed);
  }

  ngOnInit() {
    if (!this.confirmed) {
      this.confirmed = false;
    }
    console.log(this.confirmed);
    const getPortfolio = this.confirmed
      ? this.client.confirmRebalance(this.username)
      : this.client.getUserPortfolio(this.username);

    getPortfolio
      .subscribe(userData => {
        let { _id, username, ...filtered } = userData;
        filtered = Object.values(filtered);
        const bonds = filtered.filter(el => el.type === 'bonds');
        const stocks = filtered.filter(el => el.type === 'stocks');
        this.data = {
          bonds,
          stocks
        };
        console.log(this.data);
      });

    // this.client.currentMessage.subscribe((msg) => {
    //   this.data = JSON.parse(msg);
    // });
  }
}
