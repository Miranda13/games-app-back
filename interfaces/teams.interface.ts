interface Team {
  name: string;
  url_flag_image: string;
}

interface GTeam {
  team_id: number;
  score: number;
  score_id?: number; 
}

export { Team, GTeam }
