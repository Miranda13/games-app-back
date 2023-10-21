import { GTeam } from './teams.interface'

interface Game {
  hour: string;
  date: string;
  teams: [
    GTeam,
    GTeam
  ];
  location_id: number;
  played: boolean
}

interface QGame {
  game_id: number;
  hour: string;
  date: string;
  played: boolean;
  location_id: number;
  name_stadium: string;
  city: string;
  name: string;
  url_flag_image: string;
  team_id: number;
  score: number;
  score_id?: number;
}

export { Game, QGame }
