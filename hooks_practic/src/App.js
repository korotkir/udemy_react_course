import {Navbar} from './components/Navbar'
import {Home} from './pages/Home'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import {About} from './pages/About'
import {Profile} from './pages/Profile'
import {Alert} from './components/Alert'
import {AlertState} from './context/alert/AlertState'
//import 'bootstrap/dist/js/bootstrap.min.js'
import {GithubState} from './context/github/GithubState'

function App() {
  return (
    <GithubState>
      <AlertState>
        <BrowserRouter>
          <Navbar/>
          <div className="container pt-4">
            <Alert alert={{text: 'test alert'}}/>
            <Routes>
              <Route path="/" exact element={<Home/>}/>
              <Route path="/about" element={<About/>}/>
              <Route path="/profile/:name" exact element={<Profile/>}/>
            </Routes>
          </div>
        </BrowserRouter>
      </AlertState>
    </GithubState>
  )
}

export default App;
