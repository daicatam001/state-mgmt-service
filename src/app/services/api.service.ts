import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {RankingTable, RankingTableTotal} from '../models/rank';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  readonly baseUrl = 'http://api.football-data.org/v2';
  readonly PREMIER_LEAGUE = 2021;
  readonly RANK_TYPE = 'TOTAL';

  constructor(private http: HttpClient) {
  }

  getRanks(year: number): Observable<RankingTableTotal> {
    return this.http.get<RankingTable>(`${this.baseUrl}/competitions/${this.PREMIER_LEAGUE}/standings`)
      .pipe(map((rt: RankingTable) => {
        return {
          competition: rt.competition,
          ranks: rt.standings
            .filter(st => st.type === this.RANK_TYPE)[0].table
            .map(row => ({
              ...row,
              teamName: row.team.name,
              teamCrestUrl: row.team.crestUrl
            }))
        };
      }));
  }

}
