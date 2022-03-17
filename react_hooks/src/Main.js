import React from 'react'
import {useAlertToggle} from './alert/AlertContext'

export default function Main() {
  const toggle = useAlertToggle()

  return (
    <>
      <h1>Привет в примере с Context</h1>
      <button
        className="btn btn-success"
        onClick={toggle}
      >
        Показать alert
      </button>
    </>
  )
}
