import React from 'react'

const rd3 = require('react-d3');
const TreemapChart = rd3.BarChart;
const width = window.innerWidth;
const height = window.innerWidth;
let colorMap = [
  '#C8020A', // 'Anger'
  '#6EE017', // 'Disgust'
  '#FF006A', // 'Fear'
  '#FF7A06', // 'Joy'
  '#0099FF', // 'Sadness'
];


class BarChart extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      barChartData: []
    }
  }

  render() {
    return (
    	<TreemapChart
        data={
       
        	  [
        	    {
        	      "values": this.props.barChartData.watsonData
        	    }
        	  ]
        	}
        width={450}
        height={250}
        title="BarChart"
        textColor="#484848"
        fontColor="12px"
      />

    )
  }
};

export default BarChart