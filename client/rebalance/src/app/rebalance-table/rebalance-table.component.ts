import { Component, OnInit, Input } from '@angular/core';
import { ApiClientService } from '../api-client.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-rebalance-table',
  templateUrl: './rebalance-table.component.html',
  styleUrls: ['./rebalance-table.component.sass']
})
export class RebalanceTableComponent implements OnInit {
  displayedColumns: string[] = ['name', 'units-to-rebalance', 'current-allocation', 'final-value'];
  data: object;
  username: string;

  getTotal (arr, key): number {
    return arr.reduce((acc, el) => acc + el[key], 0);
  }

  constructor(
    private client: ApiClientService,
    private route: ActivatedRoute
  ) {
    this.route.parent.params.subscribe(params => this.username = params.username);
  }

  getStyle (el, key) {
    if (el[key] > 0) {
      return 'green';
    } else {
      return 'red';
    }
  }

  ngOnInit() {
    this.client.rebalance(this.username)
      .subscribe(userData => {
        let { _id, username, ...filtered } = userData;
        filtered = Object.values(filtered);
        const bonds = filtered.filter(el => el.type === 'bonds');
        const stocks = filtered.filter(el => el.type === 'stocks');
        this.data = {
          bonds,
          stocks
        };
      });
  }
}
