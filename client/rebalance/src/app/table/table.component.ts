import { Component, OnInit, Input } from '@angular/core';
import { ApiClientService } from '../api-client.service';
import { UserService } from '../user.service';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.sass'],
  providers: [UserService]
})
export class TableComponent implements OnInit {
  @Input() user: {
    bonds: {}[]
    stocks: {}[]
  }[];
  displayedColumns: string[] = ['name', 'value', 'target', 'current-allocation'];
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
