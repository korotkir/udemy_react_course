import Layout from './hoc/Layout/Layout'
import Quiz from './containers/Quiz/Quiz.js'
import QuizList from './containers/QuizList/QuizList'
import QuizCreator from './containers/QuizCreator/QuizCreator'
import Auth from './containers/Auth/Auth'
import {Routes, Route} from 'react-router-dom'


function App() {
 return (
  <Layout>
    <Routes>
        <Route path='/auth' element={<Auth />} />
        <Route path='/quiz-creator' element={<QuizCreator />} />
        <Route path='/quiz/:ident' element={<Quiz />} />
        <Route path='/' element={<QuizList />} />
    </Routes>
  </Layout>
 );
}

export default App;
