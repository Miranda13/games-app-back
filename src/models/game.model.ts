import { ILocation } from './location.model'
import { ITeam } from './team.model'

interface IGame {
  game_id: number;
  hour: string;
  date: string;
  teams: [
    ITeam,
    ITeam
  ];
  location: ILocation;
  played: boolean
}

export { IGame }
