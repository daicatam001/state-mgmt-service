import {ComponentStore} from '@ngrx/component-store';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';

export interface User {
  name: string;
  like: number;
  dislike: number;
}

export interface AuthState {
  user: User;
}

@Injectable({
  providedIn: 'root'
})
export class AuthStore extends ComponentStore<AuthState> {
  readonly user$ = this.select(state => state.user);

  readonly updateUser = this.updater((state, user: User) => ({...state, user}));


  saveUser = this.effect((user$: Observable<User>) => {
    return user$.pipe(
      tap(user => {
        if (user) {
          localStorage.setItem('state-mgmt-user', JSON.stringify(user));
        } else {
          localStorage.removeItem('state-mgmt-user');
        }
      })
    );
  });

  initUserData = this.effect(trigger$ =>
    trigger$.pipe(
      tap(() => {
        try {
          const user = JSON.parse(localStorage.getItem('state-mgmt-user'));
          if (user) {
            this.updateUser(user);
          }
        } catch (e) {
          localStorage.removeItem('state-mgmt-user');
        }
      })
    )
  );

  logout = this.effect(trigger$ =>
    trigger$.pipe(
      tap(() => {
        this.updateUser(null);
        this.router.navigate(['/not-auth']);
      })
    )
  )

  login = this.effect(trigger$ =>
    trigger$.pipe(
      tap(() => {
        this.updateUser({
          name: 'tampt',
          like: 0,
          dislike: 0
        });
        this.router.navigate(['/']);
      })
    )
  )

  constructor(private router: Router) {
    super({user: null});
    this.initUserData();
    this.saveUser(this.user$);
  }
}
