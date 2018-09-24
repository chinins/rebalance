import { Component, OnInit, Input } from '@angular/core';
import { ApiClientService } from '../api-client.service';

@Component({
  selector: 'app-rebalance-table',
  templateUrl: './rebalance-table.component.html',
  styleUrls: ['./rebalance-table.component.sass']
})
export class RebalanceTableComponent implements OnInit {
  @Input() user: {
    bonds: {}[]
    stocks: {}[]
  }[];
  displayedColumns: string[] = ['name', 'units-to-rebalance', 'current-allocation', 'final-value'];
  data: object;

  getTotal (arr, key): number {
    return arr.reduce((acc, el) => acc + el[key], 0);
  }

  constructor(
    private client: ApiClientService
  ) { }

  ngOnInit() {
    this.client.currentMessage.subscribe((msg) => {
      const user = this.data = JSON.parse(msg);
    });
  }
}
