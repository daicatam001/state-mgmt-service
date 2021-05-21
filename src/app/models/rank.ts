export interface RankingTable {
  competition: Competition;
  standings: [{
    type: 'TOTAL' | 'HOME' | 'AWAY';
    table: Rank[];
  }
  ];
}

export interface RankingTableTotal {
  competition: Competition;
  ranks: SimplifiedRank[];
}


export interface Rank {
  position: number;
  playedGames: number;
  team: Team;
  won: number;
  draw: number;
  lost: number;
  points: number;
}

export interface SimplifiedRank {
  position: number;
  playedGames: number;
  teamName: string;
  teamCrestUrl: string;
  won: number;
  draw: number;
  lost: number;
  points: number;
}

export interface Competition {
  id: number;
  name: string;
  lastUpdate: Date;
}

export interface Team {
  id: number;
  name: string;
  crestUrl: string;
}
