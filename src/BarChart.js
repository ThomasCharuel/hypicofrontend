import React from 'react'
import Chart from 'chart.js'

export default class lineChart extends React.Component{
  componentDidMount(){
    this.setChart()
  }

  componentDidUpdate(){
    this.chart.destroy()
    this.setChart()
  }

  setChart(){

		var ctx = document.getElementById("chart1").getContext("2d");
		ctx.canvas.width = 1000;
		ctx.canvas.height = 300;
		let labels = this.props.data.map((el, i) => i === 0 ? `Now` : `Week -${i}`)

		var cfg = {
			type: 'bar',
			data: {
				labels: labels.reverse(),
				datasets: [{
					data: this.props.data.reverse(),
					fill: true,
					borderColor: 'rgb(75, 192, 192)',
					backgroundColor: 'rgba(75, 192, 192, 0.4)',
					borderWidth: 2
				}]
			},
			options: {
				legend: {
					display: false
				},
				scales: {
					yAxes: [{"ticks":{"beginAtZero":true}}]
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