import React, {useEffect, useRef, useState} from 'react'

const App = props => {
  const [value, setValue] = useState('initial')
  const renderCount = useRef(1)

  const inputRef = useRef(null)
  const prevValue = useRef('')

  useEffect(() => {
    renderCount.current++
    // Получаем значение инпута
    console.log(inputRef.current.value)
  })

  useEffect(() => {
    prevValue.current = value
  }, [value])

  const focus = () => inputRef.current.focus()

  return (
    <div>
      <h1>Количество рендеров: {renderCount.current}</h1>
      <h2>Прошлое состояние: {prevValue.current}</h2>
      <input ref={inputRef} type="text" onChange={e => setValue(e.target.value)} value={value}/>
      <div className="btn btn-success" onClick={focus}>focus</div>
    </div>
  )
}

export default App
