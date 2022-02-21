const initialState = {
  counter: 0
}

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case 'ADD':
      return {
        // redux не допускает мутирования, поэтому необходимо возвращать новый объект
        counter: state.counter + 1
      }
    case 'SUB':
      return {
        counter: state.counter - 1
      }
    case 'ADD_NUMBER':
      return {
        //
        counter: state.counter + action.payload
      }
    default:
      return state
  }
}
