import { Team } from '../../interfaces/teams.interface'
import { pool } from '../db'
import { ITeam } from '../models/team.model'

interface SearchParams {
  name?: string;
}

async function insertTeam(team: Team) {
  const query = `
    INSERT INTO teams (name, url_flag_image)
    VALUES ($1, $2)
    RETURNING team_id
  `
  const values = [team.name, team.url_flag_image]
  const result = await pool.query(query, values)

  return result.rows[0].team_id
}

async function getAllTeams(searchParams?: SearchParams): Promise<ITeam[]> {
  let query: string = `SELECT * FROM teams`
  let condition: string = ``

  if (searchParams?.name) {
    condition += `name = '${searchParams.name}'`
  }

  if (condition.length) {
    query += ` WHERE ` + condition
  }

  return new Promise((resolve, reject) => {
    pool.query<ITeam>(query, (err, res) => {
      if (err) {
        reject(err)
      }
      else {
        resolve(res.rows)
      }
    })
  })
}

async function getTeamById(id: number): Promise<ITeam> {
  let query: string = `
    SELECT * FROM teams
    WHERE team_id = $1`

  const result = await pool.query(query, [id])
  
  return result.rows[0]
}

async function updateTeamById(team: Team, id: number): Promise<number> {
  const query = `
    UPDATE teams
    SET name = $1, url_flag_image = $2
    WHERE team_id = $3
  `
  const values = [team.name, team.url_flag_image, id]
  const result = await pool.query(query, values)

  return result.rowCount
}

async function deleteTeamById(id: number): Promise<number> {
  const query = `
    DELETE FROM teams
    WHERE team_id = $1
  `
  const result = await pool.query(query, [id])

  return result.rowCount
}

export {
  insertTeam,
  getAllTeams,
  getTeamById,
  updateTeamById,
  deleteTeamById
}
