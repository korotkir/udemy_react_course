import React, {Component} from 'react'
import {logout} from '../../store/actions/auth'
import {connect} from 'react-redux'
import QuizList from '../../containers/QuizList/QuizList'
import {Route} from 'react-router-dom'

class Logout extends Component {
  componentDidMount() {
    this.props.logout()
  }

  render() {
    return <Route path='*' element={<QuizList />} />
  }
}

function mapDispatchToProps(dispatch) {
  return {
    logout: () => dispatch(logout())
  }
}

export default connect(null, mapDispatchToProps)(Logout)
