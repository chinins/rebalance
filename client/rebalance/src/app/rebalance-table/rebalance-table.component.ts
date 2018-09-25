import { Component, OnInit, Input } from '@angular/core';
import { ApiClientService } from '../api-client.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-rebalance-table',
  templateUrl: './rebalance-table.component.html',
  styleUrls: ['./rebalance-table.component.sass']
})
export class RebalanceTableComponent implements OnInit {
  // @Input() user: {
  //   bonds: {}[]
  //   stocks: {}[]
  // }[];
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

  onClick (confirmed) {
    // if (!confirmed) {
    //   return;
    // }
    // this.client.confirmRebalance(this.username, confirmed)
    //   .subscribe(() => console.log('rebalance confirmed'));
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
        console.log(this.data);
      });
    // this.client.currentMessage.subscribe((msg) => {
    //   const user = this.data = JSON.parse(msg);
    // });
  }
}
