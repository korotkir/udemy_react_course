import axios from '../../axios/axios-quiz'
import {
  FETCH_QUIZ_SUCCESS,
  FETCH_QUIZES_ERROR,
  FETCH_QUIZES_START,
  FETCH_QUIZES_SUCCESS,
  QUIZ_SET_STATE,
  FINISH_QUIZ,
  QUIZ_NEXT_QUESTION, QUIZ_RETRY,
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
                name: `Тест №${index + 1}`,
                // name: Object.values(data)[index][0] === ''
                //         ? `Тест №${index + 1}`
                //         : Object.values(data)[index][0]
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

export function quizSetState(answerState, results) {
  return {
    type: QUIZ_SET_STATE,
    answerState, results
  }
}

export function finishQuiz() {
  return {
    type: FINISH_QUIZ
  }
}

export function quizNextQuestion(number) {
  return {
    type: QUIZ_NEXT_QUESTION,
    number
  }
}

export function quizAnswerClick(answerId) {
  return (dispatch, getState) => {
    const state = getState().quiz

    if (state.answerState) {
      const key = Object.keys(state.answerState)[0]
      if (state.answerState[key] === 'success') {
        return
      }
    }

    const question = state.quiz[state.activeQuestion]
    const resultsClick = state.results

    if (question.rightAnswerId === answerId) {
      if (!resultsClick[question.id]) {
        resultsClick[question.id] = 'success'
      }

      dispatch(quizSetState({[answerId]: 'success'}, resultsClick))

      // state.answerState({[answerId]: 'success'})
      // state.results(resultsClick)


      const timeout = window.setTimeout(() => {
        if (isQuizFinished(state)) {
          dispatch(finishQuiz())
          // state.isFinished(true)
        } else {
          dispatch(quizNextQuestion(state.activeQuestion + 1))
          // state.activeQuestion(state.activeQuestion + 1)
          // state.answerState(null)
        }

        window.clearTimeout(timeout)
      }, 1000)

    } else {
      resultsClick[question.id] = 'error'
      // state.answerState({[answerId]: 'error'})
      // state.results(resultsClick)
      dispatch(quizSetState({[answerId]: 'error'}, resultsClick))
    }
  }
}

export function retryQuiz() {
  return {
    type: QUIZ_RETRY
  }
}

function isQuizFinished(state) {
  return state.activeQuestion + 1 === state.quiz.length
}
