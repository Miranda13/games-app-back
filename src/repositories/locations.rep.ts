import { Location } from '../../interfaces/locations.interface'
import { pool } from '../db'
import { ILocation } from '../models/location.model'

interface SearchParams {
  name_stadium?: string;
  city?: string;
}

async function insertLocation(location: Location) {
  const query = `
    INSERT INTO locations (city, name_stadium, active)
    VALUES ($1, $2, $3)
    RETURNING id
  `
  const values = [location.city, location.name_stadium, true]
  const result = await pool.query(query, values)

  return result.rows[0].id
}

async function getAllLocations(searchParams?: SearchParams): Promise<ILocation[]> {
  let query: string = `SELECT * FROM locations`
  let condition: string = ``

  if (searchParams?.name_stadium && searchParams?.city) {
    condition += `name_stadium = '${searchParams.name_stadium}' AND city = '${searchParams.city}'`
  } else {
    if (searchParams?.name_stadium) {
    condition += `name_stadium = '${searchParams.name_stadium}'`
    }

    if (searchParams?.city) {
      condition += `city = '${searchParams.city}'`
    }
  }

  if (condition.length) {
    query += ` WHERE ` + condition
  }

  return new Promise((resolve, reject) => {
    pool.query<ILocation>(query, (err, res) => {
      if (err) {
        reject(err)
      }
      else {
        resolve(res.rows)
      }
    })
  })
}

async function getLocationById(id: number): Promise<ILocation> {
  let query: string = `
    SELECT * FROM locations
    WHERE id = $1`

  const result = await pool.query(query, [id])
  
  return result.rows[0]
}

async function updateLocationById(location: Location, id: number): Promise<number> {
  const query = `
    UPDATE locations
    SET city = $1, name_stadium = $2
    WHERE id = $3
  `
  const values = [location.city, location.name_stadium, id]
  const result = await pool.query(query, values)

  return result.rowCount
}

async function deleteLocationById(id: number): Promise<number> {
  const query = `
    DELETE FROM locations
    WHERE id = $1
  `
  const result = await pool.query(query, [id])

  return result.rowCount
}

export {
  insertLocation,
  getAllLocations,
  getLocationById,
  updateLocationById,
  deleteLocationById
}
