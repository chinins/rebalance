import { Component, OnInit, Input } from '@angular/core';
import { ApiClientService } from '../api-client.service';
import { UserInput } from '../user-input';
import { ActivatedRoute } from '@angular/router';

const _ = require('lodash');

@Component({
  selector: 'app-input-table',
  templateUrl: './input-table.component.html',
  styleUrls: ['./input-table.component.sass']
})
export class InputTableComponent implements OnInit {
  // @Input() user: {
  //   bonds: {}[]
  //   stocks: {}[]
  // }[];
  displayedColumns: string[] = ['name', 'units', 'target'];
  data: object;
  bonds: {} [];
  stocks: {} [];
  username: string;
  investment: 0;

  unitsInput;

  getTotal (arr, key): number {
    return arr.reduce((acc, el) => acc + el[key], 0);
  }

  constructor(
    private client: ApiClientService,
    private route: ActivatedRoute
  ) {
    this.route.parent.params.subscribe(params => this.username = params.username);
    this.bondsValuechange = _.debounce(this.bondsValuechange, 1000);
  }

  ngOnInit() {
    const userInput = new UserInput();
    const inputArr = Object.values(userInput);
    this.bonds = inputArr.filter(el => el.type === 'bonds');
    this.stocks = inputArr.filter(el => el.type === 'stocks');
    this.client.currentMessage.subscribe((msg) => {
      const user = this.data = JSON.parse(msg);
    });
  }

  onSubmit () {
    const investment = {
      investment: this.investment
    };
    this.client.addInvestment(this.username, investment)
      .subscribe(() => console.log(investment));
  }

  bondsValuechange(newValue, el, key) {
    console.log('tick');

    this.bonds.find(element => element.ticker === el.ticker)[key] = newValue;
    const ticker = el.ticker;
    const indexFund = {
      [`${ticker}`]: {
        type: el.type,
        units: el.units,
        target: el.target / 100
      }
    };
    // _.throttle(this.client.postIndexData(indexFund, 'sobaka')
    //   .subscribe(() => console.log(indexFund)), 3000);
    this.client.postIndexData(indexFund, this.username)
      .subscribe(() => console.log(indexFund));
  }


  stocksValuechange(newValue, el, key) {
    this.stocks.find(element => element.ticker === el.ticker)[key] = newValue;
    const ticker = el.ticker;
    const indexFund = {
      [`${ticker}`]: {
        type: el.type,
        units: el.units,
        target: el.target / 100
      }
    };
    this.client.postIndexData(indexFund, this.username)
    .subscribe(() => console.log(indexFund));
  }
}
