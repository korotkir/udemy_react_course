import {FETCH_QUIZES_ERROR, FETCH_QUIZES_START, FETCH_QUIZES_SUCCESS} from '../actions/actionTypes'
import {useState} from 'react'
import {useParams} from 'react-router-dom'

const initialState = {
  quizes: [],
  loading: false,
  error: null,
  results: {},
  isFinished: false,
  activeQuestion: 0,
  answerState: null,
  quiz: null,
  quizTitle: 'Ответьте на все вопросы!'
}

export default function quizReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_QUIZES_START:
      return {
        ...state, loading: true
      }
    case FETCH_QUIZES_SUCCESS:
      return {
        ...state, loading: false, quizes: action.quizes
      }
    case FETCH_QUIZES_ERROR:
      return {
        ...state, loading: false, error: action.error
      }
    default:
      return state
  }
}