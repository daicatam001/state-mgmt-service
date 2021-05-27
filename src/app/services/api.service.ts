import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {PaginationTeam, Team} from '../models/team';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  readonly baseUrl = 'http://api.football-data.org/v2';
  readonly PREMIER_LEAGUE = 2021;

  constructor(private http: HttpClient) {
  }

  getTeams(start: number, rows: number): Observable<PaginationTeam> {
    return this.http.get<PaginationTeam>(`${this.baseUrl}/competitions/${this.PREMIER_LEAGUE}/teams`).pipe(map(pt => ({
      ...pt,
      teams: pt.teams.slice(start * rows, rows * (start + 1))
    })));
  }


}
