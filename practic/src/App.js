import Layout from './hoc/Layout/Layout'
import Quiz from './containers/Quiz/Quiz.js'
import QuizList from './containers/QuizList/QuizList'
import QuizCreator from './containers/QuizCreator/QuizCreator'
import Auth from './containers/Auth/Auth'
import {Routes, Route} from 'react-router-dom'
import {connect} from 'react-redux'
import Logout from './components/Logout/Logout'
import {useEffect} from 'react'


function App(props) {

  useEffect(() => {
    props.autoLogin()
  })

 let routes = (
   <Routes>
     <Route path='/auth' element={<Auth />} />
     <Route path='/quiz-creator' element={<QuizCreator />} />
     <Route path='/quiz/:ident' element={<Quiz />} />
     <Route path='/' element={<QuizList />} />
     <Route path="*" element={<Auth />} />
   </Routes>
 )

 if (props.isAuthenticated) {
   routes = (
     <Routes>
       <Route path='/quiz-creator' element={<QuizCreator />} />
       <Route path='/quiz/:ident' element={<Quiz />} />
       <Route path='/' element={<QuizList />} />
       <Route path='/logout' element={<Logout />} />
       <Route path="*" element={<QuizList />} />
     </Routes>
   )
 }

 return (
  <Layout>
    { routes }
  </Layout>
 );
}

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.auth.token
  }
}

function mapDispatchToProps(dispatch) {
  return {
    autoLogin: () => dispatch(autoLogin())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
