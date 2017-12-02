import React from 'react'
import {
  Link
} from 'react-router-dom'

const startups = [
  "startup A",
  "startup B",
  "startup C"
]

const Home = () => (
  <div className="row">
    <ul className="collection with-header">
      <li className="collection-header"><h2>Current ICOs</h2></li>
      {startups.map( (el, i) => 
        <li className="collection-item" key={i}>
          <div><Link to={`/${el}`}>{el}</Link><Link to={`/${el}`} className="secondary-content"><i className="material-icons">send</i></Link></div>
        </li>
      )}
    </ul>
  </div>
)

export default Home