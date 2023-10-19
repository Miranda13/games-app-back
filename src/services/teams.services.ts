import { Request } from 'express'

import { ServiceAPIResponse } from '../../interfaces/service-response.interface'
import { Team } from '../../interfaces/teams.interface'
import { deleteTeamById, getAllTeams, getTeamById, insertTeam, updateTeamById } from '../repositories/teams.rep'
import { ITeam } from '../models/team.model'

const getAll = async (): Promise<ServiceAPIResponse<ITeam[]>> => {
  const teams = await getAllTeams()
  
  return {
    request:{ 
      status: 200
    },
    data: teams
  }
}

const getById = async (id: number): Promise<ServiceAPIResponse<ITeam>> => {
  const team = await getTeamById(id)

  if (!team) {
    return {
      request:{ 
        status: 404,
        error: {
          message: 'Not found'
        }
      }
    }
  }
  
  return {
    request:{ 
      status: 200
    },
    data: team
  }
}

const createTeam = async (team: Team): Promise<ServiceAPIResponse<number>> => {
  
  const idTeam = await insertTeam(team)

  if(!idTeam) {
    return {
      request:{ 
        status: 400,
        error: {
          message: 'Bad types sent'
        }
      }
    }
  }

  return {
    request:{ 
      status: 201
    }
  }
}

const updateTeam = async (team: Team, id: number): Promise<ServiceAPIResponse<number>> => {
  const countRows = await updateTeamById(team, id)

  if(!countRows) {
    return {
      request:{ 
        status: 404,
        error: {
          message: 'Resource not found'
        }
      }
    }
  }

  return {
    request:{ 
      status: 200
    }
  }
}

const deleteTeam = async (id: number): Promise<ServiceAPIResponse<Team>> => {
  const countRows = await deleteTeamById(id)

  if(!countRows) {
    return {
      request:{ 
        status: 404,
        error: {
          message: 'Resource not found'
        }
      }
    }
  }
  return {
    request:{ 
      status: 200
    }
  }
}

export {
  getAll,
  getById,
  createTeam,
  deleteTeam,
  updateTeam
}
