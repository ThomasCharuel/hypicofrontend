import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

const startups = [
  "startup A",
  "startup B",
  "startup C"
]

const Home = () => (
  <div>
    <h2>Startups doing an ICO</h2>
    <ul>
      {startups.map( (el, i) => <li key={i}><Link to={`/${el}`}>{el}</Link></li>)}
    </ul>
  </div>
)

export default Home