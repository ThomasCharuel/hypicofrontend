import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import './App.css';
import Home from './Home'
import ICO from './ICO'


const App = () => (
  <Router>
    <div>
      <header>
        <nav className="blue lighten-1">
          <div className="container nav-wrapper">
            <Link to='/' className="brand-logo center">Hypico</Link>
            <ul id="nav-mobile" className="left hide-on-med-and-down">
              <li><Link to='/'><i class="material-icons">home</i></Link></li>
            </ul>
          </div>
        </nav>
      </header>

      <main className="container">

        <Route exact path='/' component={Home} />

        <Route path="/:id" component={ICO} />
      </main>
    </div>
  </Router>
)

export default App