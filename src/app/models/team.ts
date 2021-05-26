export interface Team {
  id: number;
  name: string;
  crestUrl: string;
}


export interface PaginationTeam {
  count: number;
  teams: Team[];
}


export interface PageState {
  first: number;
  rows: number;
  pageCount: number;
}
