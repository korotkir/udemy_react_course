import axios from '../../axios/axios-quiz'
import {
  FETCH_QUIZ_SUCCESS,
  FETCH_QUIZES_ERROR,
  FETCH_QUIZES_START,
  FETCH_QUIZES_SUCCESS
} from './actionTypes'

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

export function fetchQuizById(ident) {
  return async dispatch => {
    dispatch(fetchQuizesStart())

    try {

      const response = await axios.get(`/quizes/${ident}.json`)
      const data = response.data

      // setQuizTitle(Object.values(data)[0])

      const quiz = data.filter(el => typeof el === 'object')

      dispatch(fetchQuizSuccess(quiz))

    } catch (e) {
      dispatch(fetchQuizesError(e))
    }
  }
}

export function fetchQuizSuccess(quiz) {
  return {
    type: FETCH_QUIZ_SUCCESS,
    quiz
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
