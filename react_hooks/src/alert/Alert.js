import React, {useContext} from 'react'
import {useAlert} from './AlertContext'

export default function Alert() {
  const alert = useAlert()

  if (!alert) return null

  return (
    <div className={"alert alert-danger"}>
      <p>Это очень и очень важное сообщение!</p>
    </div>
  )
}
