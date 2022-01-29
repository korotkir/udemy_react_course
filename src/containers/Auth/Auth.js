import React, {Component} from 'react'
import styles from './Auth.module.css'
import Button from '../../components/UI/Button/Button'
import Input from '../../components/UI/Input/Input'

export default class Auth extends Component {

  state = {
    formControls: {
      email: {
        value: '',
        type: 'email',
        label: 'E-mail',
        errorMessage: 'Введите корректный e-mail!',
        valid: false,
        touched: false,
        validation: {
          required: true,
          email: true,
        }
      },
      password: {
        value: '',
        type: 'password',
        label: 'Пароль',
        errorMessage: 'Введите корректный пароль!',
        valid: false,
        touched: false,
        validation: {
          required: true,
          minLength: 6
        }
      }
    }
  }

  loginHandler = () => {

  }

  registerHandler = () => {

  }

  submitHandler = event => {
    event.preventDefault()
  }

  onChangeHandler = (event, controlName) => {
    console.log(controlName,': ',event.target.value)
  }

  renderInputs() {
    return Object.keys(this.state.formControls).map((controlName, index) => {
      const control = this.state.formControls[controlName]
      return (
        <Input
          key={controlName + index}
          type={control.type}
          value={control.value}
          valid={control.valid}
          touched={control.touched}
          label={control.label}
          shouldValidate={!!control.validation}
          errorMessage={control.errorMessage}
          onChange={event => this.onChangeHandler(event, controlName)}
        />
      )
    })
  }

  render() {
    return (
      <div className={styles.Auth}>
        <div>
          <h1>Авторизация</h1>

          <form className={styles.AuthForm} onSubmit={this.submitHandler}>

            { this.renderInputs() }

            <Button type="success" onClick={this.loginHandler}>Войти</Button>
            <Button type="primary" onCloick={this.registerHandler}>Зарегистрироваться</Button>
          </form>
        </div>
      </div>
    )
  }
}
