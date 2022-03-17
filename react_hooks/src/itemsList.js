import React, {useEffect, useState} from 'react'

export default function ItemsList({ getItems }) {
  const [items, setItems] = useState([])

  useEffect(() => {
    console.log('useEffect!')
    const newItems = getItems()
    setItems(newItems)
  }, [getItems])

  return (
    <ul>
      { items.map(i => <li key={i}>{i}</li>) }
    </ul>
  )
}
