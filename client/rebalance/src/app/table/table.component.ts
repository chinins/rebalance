import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiClientService } from '../api-client.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.sass']
})
export class TableComponent implements OnInit {
  @Input() user: {
    bonds: {}[]
    stocks: {}[]
  }[];
  displayedColumns: string[] = ['name', 'units', 'value', 'target'];
  totalUnits: number;
  totalValue: number;
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
