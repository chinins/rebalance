import { Component, OnInit, Input } from '@angular/core';
import { ApiClientService } from '../api-client.service';
import { UserInput } from '../user-input';

const _ = require('lodash');

@Component({
  selector: 'app-input-table',
  templateUrl: './input-table.component.html',
  styleUrls: ['./input-table.component.sass']
})
export class InputTableComponent implements OnInit {
  @Input() user: {
    bonds: {}[]
    stocks: {}[]
  }[];
  displayedColumns: string[] = ['name', 'units', 'target'];
  data: object;
  bonds: {} [];
  stocks: {} [];

  getTotal (arr, key): number {
    return arr.reduce((acc, el) => acc + el[key], 0);
  }

  constructor(
    private client: ApiClientService
  ) { }

  ngOnInit() {
    const userInput = new UserInput();
    const inputArr = Object.values(userInput);
    this.bonds = inputArr.filter(el => el.type === 'bonds');
    this.stocks = inputArr.filter(el => el.type === 'stocks');
    this.client.currentMessage.subscribe((msg) => {
      const user = this.data = JSON.parse(msg);
    });
  }

  bondsValuechange(newValue, el, key) {
    this.bonds.find(element => element.ticker === el.ticker)[key] = newValue;
    const ticker = el.ticker;
    const indexFund = {
      [`${ticker}`]: {
        type: el.type,
        units: el.units,
        target: el.target
      }
    };
    // _.throttle(this.client.postIndexData(indexFund, 'sobaka')
    //   .subscribe(() => console.log(indexFund)), 3000);
    this.client.postIndexData(indexFund, 'sobaka')
      .subscribe(() => console.log(indexFund));
  }


  stocksValuechange(newValue, el, key) {
    this.stocks.find(element => element.ticker === el.ticker)[key] = newValue;

    console.log(this.stocks);
  }
}
