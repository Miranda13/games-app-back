import { ServiceAPIResponse } from '../../interfaces/service-response.interface'
import { Game, QGame } from '../../interfaces/games.interface'
import { deleteGameById, getAllGames, getGameById, insertGame, updateGameById } from '../repositories/games.rep'
import { IGame } from '../models/game.model'
import { Score } from '../../interfaces/scores.interface'
import { GTeam } from '../../interfaces/teams.interface'
import { insertScore } from '../repositories/scores.rep'
import { updateScore } from './scores.services'

const buildGame = (gamesList: QGame[]): IGame[] => {
  const gamesBuilt = gamesList.reduce((result:IGame[], objc, index) => {
    if (index % 2 === 0) {
      if (index + 1 < gamesList.length) {
        const iGame: IGame = {
          game_id: objc.game_id,
          hour: objc.hour,
          date: objc.date,
          played: objc.played,
          location: {
            location_id: objc.location_id,
            name_stadium: objc.name_stadium,
            city: objc.city
          },
          teams: [
            {
              team_id: objc.team_id,
              name: objc.name,
              url_flag_image: objc.url_flag_image,
              score: objc.score,
              score_id: objc.score_id
            },
            {
              team_id: gamesList[index+1].team_id,
              name: gamesList[index+1].name,
              url_flag_image: gamesList[index+1].url_flag_image,
              score: gamesList[index+1].score,
              score_id: gamesList[index+1].score_id
            }
          ]
        }
        result.push(iGame)
      }
    }
    return result
  }, [])
  return gamesBuilt
}

const getAll = async (): Promise<ServiceAPIResponse<IGame[]>> => {
  const games = await getAllGames()
  const iGames = buildGame(games)

  return {
    request:{ 
      status: 200
    },
    data: iGames
  }
}

const getById = async (id: number): Promise<ServiceAPIResponse<IGame>> => {
  const game = await getGameById(id)

  if (!game) {
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
    data: buildGame(game)[0]
  }
}

const createGame = async (game: Game): Promise<ServiceAPIResponse<number>> => {

  game.location_id = Number(game.location_id)
  game.teams[0].score = Number(game.teams[0].score)
  game.teams[1].score = Number(game.teams[1].score)
  game.teams[0].team_id = Number(game.teams[0].team_id)
  game.teams[1].team_id = Number(game.teams[1].team_id)

  if(!game.location_id || isNaN(game.teams[0].score) || isNaN(game.teams[1].score) || 
    !game.teams[0].team_id || !game.teams[1].team_id) {
      return {
        request:{ 
          status: 400,
          error: {
            message: 'Bad types sent'
          }
        }
      }
  }
  
  const idGame = await insertGame(game)

  if(!idGame) {
    return {
      request:{ 
        status: 400,
        error: {
          message: 'Bad types sent'
        }
      }
    }
  }

  game.teams.map(async (team: GTeam) => {
    const newScore: Score = {
      team_id: team.team_id,
      game_id: idGame,
      score: team.score
    }

    const idScore = await insertScore(newScore)

    if(!idScore) {
      return {
        request:{ 
          status: 400,
          error: {
            message: 'Bad types sent'
          }
        }
      }
    }
  })

  return {
    request:{ 
      status: 201
    }
  }
}

const updateGame = async (game: Game, id: number): Promise<ServiceAPIResponse<number>> => {
  
  game.location_id = Number(game.location_id)
  game.teams[0].score = Number(game.teams[0].score)
  game.teams[1].score = Number(game.teams[1].score)
  game.teams[0].team_id = Number(game.teams[0].team_id)
  game.teams[1].team_id = Number(game.teams[1].team_id)
  if(game.teams[0].score_id) {
    game.teams[0].score_id = Number(game.teams[0].score_id)
  }
  if(game.teams[1].score_id) {
    game.teams[1].score_id = Number(game.teams[1].score_id)
  }

  if(!game.location_id || isNaN(game.teams[0].score) || isNaN(game.teams[1].score) || 
    !game.teams[0].team_id || !game.teams[1].team_id ) {
    return {
      request:{ 
        status: 400,
        error: {
          message: 'Bad types sent'
        }
      }
    }
  }
  
  const countRows = await updateGameById(game, id)

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

  game.teams.map(async (team: GTeam) => {
    const newScore: Score = {
      team_id: team.team_id,
      game_id: id,
      score: team.score
    }

    const rowsScore = await updateScore(newScore, team.score_id || 0)

    if(rowsScore.request.status > 300) {
      return {
        request:{ 
          status: 400,
          error: {
            message: 'Bad types sent'
          }
        }
      }
    }
  })

  return {
    request:{ 
      status: 200
    }
  }
}

const deleteGame = async (id: number): Promise<ServiceAPIResponse<Game>> => {
  const countRows = await deleteGameById(id)

  if(!countRows) {
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
    }
  }
}

export {
  getAll,
  getById,
  createGame,
  deleteGame,
  updateGame
}
