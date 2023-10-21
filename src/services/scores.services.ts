import { ServiceAPIResponse } from '../../interfaces/service-response.interface'
import { Score } from '../../interfaces/scores.interface'
import { insertScore, updateScoreById } from '../repositories/scores.rep'

const createScore = async (score: Score): Promise<ServiceAPIResponse<number>> => {
  
  const idScore = await insertScore(score)

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

  return {
    request:{ 
      status: 201
    }
  }
}

const updateScore = async (score: Score, id: number): Promise<ServiceAPIResponse<number>> => {
  const countRows = await updateScoreById(score, id)

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
  createScore,
  updateScore
}
