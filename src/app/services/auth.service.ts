import {Injectable} from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';
import {User} from '../models/user';
import {map, take, takeUntil} from 'rxjs/operators';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user = new BehaviorSubject<User>(null);
  isLoggedIn = new BehaviorSubject<boolean>(false);
  destroy = new Subject();

  user$ = this.user.asObservable();
  isLoggedIn$ = this.user.asObservable().pipe(map(user => !!user));
  destroy$ = this.destroy.asObservable();

  constructor(private router: Router) {
    this.initUserData();
    this.user$
      .pipe(takeUntil(this.destroy$))
      .subscribe(user => {
        this.saveUser(user);
      });
  }

  login(): void {
    this.user.next({
      name: 'tampt',
      like: 0,
      dislike: 0
    });
    this.router.navigate(['/']);
  }

  logout(): void {
    this.user.next(null);
    this.router.navigate(['/not-auth']);
  }

  incrementLike(): void {
    this.user$.pipe(
      take(1)
    ).subscribe(user => {
      this.user.next({...user, like: user.like + 1});
    });
  }

  incrementDislike(): void {
    this.user$.pipe(
      take(1)
    ).subscribe(user => {
      this.user.next({...user, dislike: user.dislike + 1});
    });
  }

  initUserData(): void {
    try {
      const user = JSON.parse(localStorage.getItem('state-mgmt-user'));
      if (user) {
        this.user.next(user);
      }
    } catch (e) {
      localStorage.removeItem('state-mgmt-user');
    }
  }

  saveUser(user: User): void {
    if (user) {
      localStorage.setItem('state-mgmt-user', JSON.stringify(user));
    } else {
      localStorage.removeItem('state-mgmt-user');
    }
  }
}
