import React from 'react'
import moment from 'moment'
import Chart from 'chart.js'

function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

function randomBar(date, lastClose) {
  var open = randomNumber(lastClose * .95, lastClose * 1.05);
  var close = randomNumber(open * .95, open * 1.05);
  var high = randomNumber(Math.max(open, close), Math.max(open, close) * 1.1);
  var low = randomNumber(Math.min(open, close) * .9, Math.min(open, close));
  return {
    t: date.valueOf(),
    y: close
  };
}

export default class lineChart extends React.Component{
  componentDidMount(){
    this.setChart()
  }

  componentDidUpdate(){
    this.chart.destroy()
    this.setChart()
  }

  setChart(){
    var dateFormat = 'MMMM DD YYYY';
		var date = moment('April 01 2017', dateFormat);
		var data = [randomBar(date, 30)];
		var labels = [date];
		while (data.length < 60) {
			date = date.clone().add(1, 'd');
			if (date.isoWeekday() <= 5) {
				data.push(randomBar(date, data[data.length - 1].y));
				labels.push(date);
			}
		}

		var ctx = document.getElementById("chart1").getContext("2d");
		ctx.canvas.width = 1000;
		ctx.canvas.height = 300;
		var cfg = {
			type: 'bar',
			data: {
				labels: labels,
				datasets: [{
					data: data,
					type: 'line',
					pointRadius: 0,
					fill: true,
					borderColor: 'rgb(75, 192, 192)',
					backgroundColor: 'rgba(75, 192, 192, 0.4)',
					lineTension: 0.1,
					borderWidth: 2
				}]
			},
			options: {
				legend: {
					display: false
				},
				scales: {
					xAxes: [{
						type: 'time',
						distribution: 'series',
						ticks: {
							source: 'labels'
						}
					}],
					yAxes: [{
						scaleLabel: {
							display: true,
							labelString: 'Confidence indicator'
						}
					}]
				}
			}
		};
		this.chart = new Chart(ctx, cfg);
  }

  render(){
    return (
      <canvas id="chart1" width="400" height="200"></canvas>
    )
  }
}