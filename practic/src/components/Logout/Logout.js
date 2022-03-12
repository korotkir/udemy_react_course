import React, {Component} from 'react'
import {logout} from '../../store/actions/auth'
import {connect} from 'react-redux'
import QuizList from '../../containers/QuizList/QuizList'
import {Route, Routes} from 'react-router-dom'
import Auth from '../../containers/Auth/Auth'

class Logout extends Component {
  componentDidMount() {
    this.props.logout()
  }

  render() {
    return (
      <Routes><Route path='/' element={<QuizList />} /></Routes>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    logout: () => dispatch(logout())
  }
}

export default connect(null, mapDispatchToProps)(Logout)
