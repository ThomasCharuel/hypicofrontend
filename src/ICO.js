import React from 'react'
import BarChart from './BarChart'
import LineChart from './LineChart'
import './ICO.css'

var config = require('./config.json');

var startups = require('./startups.json');

var Client = require('node-rest-client').Client;
var client = new Client();


export default class ICO extends React.Component{
  constructor(props){
    super(props);

    let startup = startups.find((el) => el.id === this.props.match.params.id)

    let reposCommits = [];

    this.state = {
      startup: startup,
      selectValue: 'indicator'
    }

    // Get Github access token
    let args = {
      'headers': {
        'Authorization': `token ${config.GITHUB_API_TOKEN}`
      }
    };

    // Get all github repos for the user
    client.get(`https://api.github.com/users/${startup.github}/repos`, args, function (data, response) {
      if(data){
        data.forEach((row) => {
          // For each repo get the number of commit per week
          client.get(`https://api.github.com/repos/${startup.github}/${row.name}/stats/participation`, args, function (data, response) {
            if(data)
              reposCommits.push(data.all)
          });
        })
      }
    });

    setTimeout(() => {
      let commitsPerWeek = []
      if(reposCommits.length > 0){
        commitsPerWeek = new Array(reposCommits[0].length).fill(0);
        // Add for each week
        reposCommits.forEach((repoCommit) => {
          repoCommit.forEach((weekCommit, i) => commitsPerWeek[i] += weekCommit)
        })
      }
      this.setState({
        barchartData: commitsPerWeek
      })
    }, 2000);  

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
          <i className="fa fa-globe fa-1x" aria-hidden="true"></i> <a href={this.state.startup.website}>Website</a> - <i className="fa fa-file-o fa-1x" aria-hidden="true"></i>  <a href={this.state.startup.white_paper}>White Paper</a> - <i className="fa fa-github fa-1x" aria-hidden="true"></i>  <a href={`https://github.com/${this.state.startup.github}`}>Github</a>
        </blockquote>
        <select className="browser-default" value={this.state.selectValue} onChange={this.handleSelectChange}>
          <option value="indicator">Indicator Chart</option>
          <option value="activity">Activity Chart</option>
        </select>
        { this.state.selectValue === 'indicator' ? 
        <LineChart data={this.state.startup.data} size={[500, 500]} />
        :
        <BarChart data={this.state.barchartData} size={[500, 500]} />
        }
      </div>
    )
  }
}