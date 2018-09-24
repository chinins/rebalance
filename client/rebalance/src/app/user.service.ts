import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class UserService {

  userData = new Subject<object>();

  userFetched$ = this.userData.asObservable();

  fetchUser(user: object) {
    this.userData.next(user);
  }
};