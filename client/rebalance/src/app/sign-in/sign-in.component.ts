import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ApiClientService } from '../api-client.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.sass'],
  encapsulation: ViewEncapsulation.None
})
export class SignInComponent implements OnInit {
  username: string;
  email: string;
  usernameNew: string;

  constructor(
    private client: ApiClientService
  ) { }

  ngOnInit() {
  }

  onClick() {
    this.client.createUser(this.usernameNew)
      .subscribe(() => console.log('got here'));
  }
}
