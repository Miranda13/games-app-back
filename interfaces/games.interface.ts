interface Game {
  hour: string;
  date: string;
  team_a_id: number;
  team_b_id: number;
  score_a: number;
  score_b: number;
  location_id: number;
  played: boolean
}

export { Game }
