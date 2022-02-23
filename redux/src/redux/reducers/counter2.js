const initialState = {
  counter: 200
}

export default function counter2(state = initialState, action) {
  switch (action.type) {
    case 'ADD2':
      return {
        // redux не допускает мутирования, поэтому необходимо возвращать новый объект
        counter: state.counter + action.payload
      }
    case 'SUB2':
      return {
        counter: state.counter - 1
      }
    case 'ADD_NUMBER2':
      return {
        //
        counter: state.counter + action.payload
      }
    default:
      return state
  }
}
