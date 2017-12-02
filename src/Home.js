import React from 'react'
import {
  Link
} from 'react-router-dom'

var startups = require('./startups.json');

const Home = () => (
  <div className="row">
    <ul className="collection with-header">
      <li className="collection-header"><h2>Current ICOs</h2></li>
      {startups.map( (el, i) => 
        <li className="collection-item" key={i}>
          <div><Link to={`/${el.id}`}>{el.id}</Link><Link to={`/${el.id}`} className="secondary-content"><i className="material-icons">send</i></Link></div>
        </li>
      )}
    </ul>
  </div>
)

export default Home