import { Game, QGame } from '../../interfaces/games.interface'
import { pool } from '../db'

interface SearchParams {
  date?: string;
  team?: string;
}

async function insertGame(game: Game) {
  const query = `
    INSERT INTO games (location_id, hour, date, played, active)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING game_id
  `
  const values = [game.location_id, game.hour, game.date, game.played, true]
  const result = await pool.query(query, values)

  return result.rows[0].game_id
}

async function getAllGames(searchParams?: SearchParams): Promise<QGame[]> {
  let query: string = `
    SELECT gm.game_id, gm.hour, TO_CHAR(gm.date, 'Mon DD YYYY') as date, gm.played,
    lc.location_id, lc.name_stadium, lc.city,
    tm.name, tm.url_flag_image, tm.team_id,
    sc.score, sc.score_id
    FROM games gm
    JOIN scores sc ON sc.game_id = gm.game_id
    JOIN teams tm ON sc.team_id = tm.team_id
    JOIN locations lc ON gm.location_id = lc.location_id
    ORDER BY gm.game_id
    `
  let condition: string = ``

  if (searchParams?.date && searchParams?.team) {
    condition += `gm.date = '${searchParams.date}' AND tm.name = '${searchParams.team}'`
  } else {
    if (searchParams?.date) {
      condition += `gm.date = '${searchParams.date}'`
    }

    if (searchParams?.team) {
      condition += `city = '${searchParams.team}'`
    }
  }

  if (condition.length) {
    query += ` WHERE ` + condition
  }
  
  const result = await pool.query(query)

  return result.rows
}

async function getGameById(id: number): Promise<QGame[]> {
  let query: string = `
    SELECT gm.game_id, gm.hour, TO_CHAR(gm.date, 'Mon DD YYYY') as date, gm.played,
    lc.location_id, lc.name_stadium, lc.city,
    tm.name, tm.url_flag_image, tm.team_id,
    sc.score, sc.score_id
    FROM games gm
    JOIN scores sc ON sc.game_id = gm.game_id
    JOIN teams tm ON sc.team_id = tm.team_id
    JOIN locations lc ON gm.location_id = lc.location_id
    WHERE gm.game_id = $1
    `

  const result = await pool.query(query, [id])
  
  return result.rows
}

async function updateGameById(game: Game, id: number): Promise<number> {
  const query = `
    UPDATE games
    SET location_id = $1, hour = $2, date = $3, played = $4
    WHERE game_id = $5
  `
  const values = [game.location_id, game.hour, game.date, game.played, id]
  const result = await pool.query(query, values)

  return result.rowCount
}

async function deleteGameById(id: number): Promise<number> {
  const query = `
    DELETE FROM games
    WHERE game_id = $1
  `
  const result = await pool.query(query, [id])

  return result.rowCount
}

export {
  insertGame,
  getAllGames,
  getGameById,
  updateGameById,
  deleteGameById
}