import React, {useState, useMemo} from 'react'

// Наша задача оптимизировать приложение, избавясь от сложных вычислений
// С помощью данной функции мы нагрузили наше приложение,
// теперь при нажатии на кнопки "Увеличить" и "Уменьшить" рендер занимает внушительное время (пару секунд)
function complexCompute(num) {
  let i = 0
  // Бесполезный цикл, "тормозящий" наше приложение
  while (i < 1000000000) i++
  return num * 2
}

function App() {
  const [number, setNumber] = useState(42)
  // Данный state нужен чтобы изменить увет заголовка
  // Поскольку при нажатии на кнопку мы заставляем компонент отрендериться снова, задержка присутствует и тут
  const [colored, setColored] = useState(false)

  const styles = {
    color: colored ? 'darkred' : 'black'
  }

  // Теперь у нас появилась возможность закэшировать это значение
  // Т.е если это значение не изменилось мы можем не изменять эту функцию
  const computed = useMemo(() => {
    return complexCompute(number)
  }, [number]) // вторым параметром является набор зависимостей
  // т.е мы указываем что в данном случае вычисления зависят от состояния number

  return (
    <>
      <h1 style={styles}>Вычисляемое свойство: {computed}</h1>
      <button className={'btn btn-success'} onClick={() => setNumber(prev => prev + 1)}>Увеличить</button>
      <button className={'btn btn-danger'} onClick={() => setNumber(prev => prev - 1)}>Уменьшить</button>
      <button className={'btn btn-primary'} onClick={() => setColored(prev => !prev)}>Изменить</button>
    </>
  )
}

export default App
