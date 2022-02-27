// Actions creator - функции которые выдают определенный actions

import {ADD, ADD_NUMBER, SUB, ADD2} from './actionsTypes'

export function add() {
  return {
    type: ADD
  }
}

export function sub() {
  return {
    type: SUB
  }
}

export function addNumber(number) {
  return {
    type: ADD_NUMBER,
    payload: number
  }
}

export function add2(number) {
  return {
    type: ADD2,
    payload: number
  }
}

export function asyncAdd(number) {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(addNumber(number))
    }, 3000)
  }
}
