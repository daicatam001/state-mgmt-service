import {Component, OnInit} from '@angular/core';
import {AuthStore} from '../../stores/auth.store';

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  readonly user$ = this.authStore.user$;

  constructor(private authStore: AuthStore) {
  }

  ngOnInit(): void {
  }

  login(): void {
    this.authStore.login();
  }

  logout(): void {
    this.authStore.logout();
  }

}
