import { Score } from '../../interfaces/scores.interface'
import { pool } from '../db'

async function insertScore(score: Score) {
  const query = `
    INSERT INTO scores (score, team_id, game_id)
    VALUES ($1, $2, $3)
    RETURNING score_id
  `
  const values = [score.score, score.team_id, score.game_id]
  const result = await pool.query(query, values)

  return result.rows[0].location_id
}

async function updateScoreById(score: Score, id: number): Promise<number> {
  const query = `
    UPDATE scores
    SET score = $1, team_id = $2, game_id = $3
    WHERE score_id = $4
  `
  const values = [score.score, score.team_id, score.game_id, id]
  const result = await pool.query(query, values)

  return result.rowCount
}

export {
  insertScore,
  updateScoreById
}
