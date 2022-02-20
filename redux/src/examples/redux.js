const redux = require('redux')

const initialState = {
  counter: 0
}

// Reducer
// Обычная js функция которая делает некоторые преобразования
const reducer = (state = initialState, action) => {

  if (action.type === 'ADD') {
    return {
      counter: state.counter + 1
    }
  }

  if (action.type === 'SUB') {
    return {
      counter: state.counter - 1
    }
  }

  if (action.type === 'ADD_NUMBER') {
    return {
      counter: state.counter + action.value
    }
  }

// По правилу redux, reducer всегда должен возвращать state
  return state
}

// Store
// Место в котором хранятся все данные.
// Redux пропагандируем чтобы в одном объекте хранился state всего приложения
const store = redux.createStore(reducer)

// Мы убрали все консольные логи, теперь подпишемся на обновления стора
store.subscribe(() => {
  console.log('Subscribe', store.getState())
})
// У store есть метод getState() позволяющий получить значение нашего store

// Actions
// Actions создан для того, чтобы менять состояние нашего store
// у action есть обязательное требование, он должен содержать
// поле type, которое является строкой
// Это поле необходимо для того, чтобы можно было понять
// какое действие мы в данный момент совершаем
const addCounter = {
  type: 'ADD'
}

store.dispatch(addCounter)

store.dispatch({type: 'SUB'})

store.dispatch({type: 'ADD_NUMBER', value: 11})
