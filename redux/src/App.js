import './App.css';
import {useState} from 'react'
// Функция connect (работает как HOC) позволяет соеденить компонент React с Store редакса
import {connect} from 'react-redux'

function App(props) {
  const [counter, setCounter] = useState(0)

  function addCounter() {
    setCounter(counter + 1)
  }

  function removeCounter() {
    setCounter(counter - 1)
  }

  console.log('APP ', props)

  return (
    <div className="App">
      <h1>Счетчик</h1>
      <h3>{props.counter}</h3>
      <div>
        <button onClick={props.onAdd} className="btn btn-success">Увеличить</button>
        <button onClick={props.onSub} className="btn btn-danger">Уменьшить</button>
      </div>
      <div>
        <button onClick={() => props.onAddNumber(15)} className="btn btn-success">Добавить 15</button>
        <button onClick={() => props.onAddNumber(-17)} className="btn btn-danger">Уменьшить на 15</button>
      </div>
    </div>

  )
}

// Данная функция принимает в себя некоторый state
// (общий state который характерен для всего нашего приложения)
// Мы изменим данные из state для того, чтобы они стали
// обычными параметрами для компонента который мы соединяем
// имеется в виду state редюсера
function mapStateToProps(state) {
  return {
    // говорим что данное поле будет равняться названию counter
    // теперь данное поле мы можем использовать в компоненте app не как state,
    // а как props
    counter: state.counter
  }
}

// функция-хелпер которая позволит нам манипулировать состоянием стора
// данная функция передает в пропсы методы манипулирования со state
function mapDispatchToProps(dispatch) {
  return {
    onAdd: () => dispatch({type: 'ADD'}),
    onSub: () => dispatch({type: 'SUB'}),
    // Передаем в number в поле payload
    onAddNumber: (number) => dispatch({type: 'ADD_NUMBER', payload: number})
  }
}

// Вызываем функцию connect
// Мы вызовем функцию connect и после того как она
// будет вызвана она нам вернет новую функцию, в
// которую мы должны положить компонент с которым хотим работать

// Данная функция принимает в себя два опциональных параметра (дву функции)
// порядок аргументов важен, если нам нужно передать только mapDispatchToProps
// тогда первым аргументом можно передать null
export default connect(mapStateToProps, mapDispatchToProps)(App);
