import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import Home from './Home'
import ICO from './ICO'


const App = () => (
  <Router>
    <div className="container">
      <header className="row">
        <Link to='/'>Home</Link>
        <h1>Hypico</h1>
      </header>


      <Route exact path='/' component={Home} />

      <Route path="/:id" component={ICO} />
    </div>
  </Router>
)

export default App