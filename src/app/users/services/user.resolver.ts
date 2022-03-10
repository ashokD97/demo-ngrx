import { State } from './../../store/reducers/index';
import { areUsersLoaded } from '../../store/selectors/user.selectors';
import { loadUsers, usersLoaded } from '../../store/actions/user.actions';
import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import { Observable } from 'rxjs';
import {select, Store} from '@ngrx/store';
import {filter, finalize, first, tap} from 'rxjs/operators';

@Injectable()
export class UserResolver implements Resolve<Observable<any>> {

  constructor(private store: Store<State>) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.store
    .pipe(
        select(areUsersLoaded),
        tap((usersLoaded) => {
          if (!usersLoaded) {
            this.store.dispatch(loadUsers());
          }

        }),
        filter(usersLoaded => usersLoaded),
        first()
    );
  }
}