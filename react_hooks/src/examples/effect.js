import React, {useState, useEffect} from 'react'

const App = props => {
  const [type, setType] = useState('users')
  const [data, setData] = useState([])

  // useEffect(() => {
  //   console.log('render')
  // })

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/${type}`)
      .then(response => response.json())
      .then(json => setData(json))
  }, [type])

  return (
    <div>
      <h1>Ресурс: {type}</h1>

      <button onClick={() => setType('users')}>Пользователи</button>
      <button onClick={() => setType('todos')}>Todo</button>
      <button onClick={() => setType('posts')}>Посты</button>

      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>


  )
}

export default App
