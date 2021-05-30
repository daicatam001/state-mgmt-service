import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {PaginationTeam, Player, TeamDetail, TeamView} from '../models/team';

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

  getTeam(id: number): Observable<TeamView> {
    return this.http.get<TeamDetail>(`${this.baseUrl}/teams/${id}`).pipe(map((team: TeamDetail) => ({
      ...team,
      coach: team.squad.find(member => member.role === 'COACH'),
      players: team.squad.filter(member => member.role === 'PLAYER')
    } as TeamView)));
  }

  getPlayer(id: number): Observable<Player> {
    return this.http.get<Player>(`${this.baseUrl}/players/${id}`);
  }

}
