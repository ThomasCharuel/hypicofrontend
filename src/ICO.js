import React from 'react'
import BarChart from './BarChart'
import LineChart from './LineChart'

import './ICO.css'

var startups = require('./startups.json');


export default class ICO extends React.Component{
  constructor(props){
    super(props);

    let startup = startups.find((el) => el.id == this.props.match.params.id)

    this.state = {
      startup: startup,
      selectValue: 'indicator'
    }

    this.handleSelectChange = this.handleSelectChange.bind(this);
  }

  handleSelectChange(event) {
    this.setState({selectValue: event.target.value});
  }

  render(){
    return (
      <div className="row">
        <div className="right">Indicator <span className="indicatorBubble">{this.state.startup.indicator}</span></div>
        <h3 className="blue-grey-text text-darken-2">{this.state.startup.id}</h3>
        <blockquote className="blue-grey-text text-darken-3">
          {this.state.startup.description}
          <br />
          <br />
          <i className="fa fa-file-o fa-1x" aria-hidden="true"></i>  <a href={this.state.startup.white_paper}>White Paper</a> - <i className="fa fa-github fa-1x" aria-hidden="true"></i>  <a href={this.state.startup.github}>Github</a>
        </blockquote>
        <select className="browser-default" value={this.state.selectValue} onChange={this.handleSelectChange}>
          <option value="indicator">Indicator Chart</option>
          <option value="activity">Activity Chart</option>
        </select>
        { this.state.selectValue == 'indicator' ? 
        <LineChart data={[5, 10, 1, 3]} size={[500, 500]} />
        :
        <BarChart data={[5, 10, 1, 3]} size={[500, 500]} />
        }
      </div>
    )
  }
}