export interface Team {
  id: number;
  name: string;
  crestUrl: string;
}


export interface PaginationTeam {
  count: number;
  teams: Team[];
}

export interface TeamDetail {
  id: number;
  name: string;
  crestUrl: string;
  squad: Member[];
}

export interface TeamView extends TeamDetail {
  coach: Member;
  players: Member[];
}

export interface Member {
  id: number;
  name: string;
  position: string;
  role: 'PLAYER' | 'COACH';
}


export interface Player {
  id: number;
  name: string;
  dateOfBirth: string;
  nationality: string;
  position: string;
}
