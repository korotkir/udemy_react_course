import axios from '../../axios/axios-quiz'
import {FETCH_QUIZES_ERROR, FETCH_QUIZES_START, FETCH_QUIZES_SUCCESS} from './actionTypes'

export function fetchQuizes() {
  return async dispatch => {
    dispatch(fetchQuizesStart())
    try {
        const response = await axios.get('/quizes.json')
        const quizes = []
        Object.keys(response.data).forEach((key, index) => {
            let data = response.data
            quizes.push({
                id: key,
                // name: `Тест №${index + 1}`,
                name: Object.values(data)[index][0] === ''
                        ? `Тест №${index + 1}`
                        : Object.values(data)[index][0]
            })
        })

       dispatch(fetchQuizesSuccess(quizes))
    } catch (e) {
        console.log(fetchQuizesError(e))
    }
  }
}

export function fetchQuizesStart() {
  return {
    type: FETCH_QUIZES_START
  }
}

export function fetchQuizesSuccess(quizes) {
  return {
    type: FETCH_QUIZES_SUCCESS,
    quizes
  }
}

export function fetchQuizesError(e) {
  return {
    type: FETCH_QUIZES_ERROR,
    error: e
  }
}
