import {useState} from 'react'
import {Transition, CSSTransition} from 'react-transition-group'
import {List} from './List'

export default function App() {
  // Исходное состояния (visible) для квадрата
  const [toggle, setToggle] = useState(true)
  const [toggle2, setToggle2] = useState(true)
  const [items, setItems] = useState([
    {id: 1, title: 'Title 1'},
    {id: 2, title: 'Title 2'},
    {id: 3, title: 'Title 3'},
    {id: 4, title: 'Title 4'},
  ])

  const removeItem = id => setItems(items.filter(i => i.id !== id))
  const addItem = () => {
    const title = prompt('Enter item title')
    const id = Date.now()

    setItems(items.concat([{title, id}]))
  }

  return (
    <div className="container">
      <div className="btn-group" role="group" aria-label="Basic example">
        <button className={'btn btn-warning'} onClick={() => setToggle(!toggle)}>Toggle</button>
        <button className={'btn btn-success'} onClick={() => setToggle2(!toggle2)}>Toggle2</button>
        <button className={'btn btn-danger'} onClick={addItem}>Add Item</button>
      </div>
      <hr/>
      <div className={'blocks'}>
        <Transition
          in={toggle}
          timeout={{
            // При входе анимация выполняется за 1 секунду
            enter: 1000,
            // При выходе анимация выполняется за пол секунды
            exit: 500
          }}
          // Элемент монтируется при входе
          mountOnEnter
          // Демонтируется при выходе
          unmountOnExit
          // Возможность отслеживания каждого состояния
          onEnter={() => console.log('onEnter')}
          onEntered={() => console.log('onEntered')}
          onEntering={() => console.log('onEntering')}
          onExit={() => console.log('onExit')}
          onExited={() => console.log('onExited')}
          onExiting={() => console.log('onExiting')}
        >
          {/*Сам квадрат*/}
          {state => <div className={`square blue ${state}`}>{state}</div>}
        </Transition>

        <CSSTransition
          in={toggle2}
          timeout={1000}
          mountOnEnter
          unmountOnExit
          classNames="os"
        >
          <div className="square orange">
            {toggle2.toString()}
          </div>
        </CSSTransition>

      </div>
      <div className="blocks">
        <List items={items} onRemove={removeItem}/>
      </div>
    </div>
  )
}
