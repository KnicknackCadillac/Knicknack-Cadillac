import React from 'react'

const rd3 = require('react-d3');
const TreemapChart = rd3.BarChart;
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
    if(this.props.clicked){
      var width = window.innerWidth;
      var height = 250;
      var labels = true;
    }else{
       var width = window.innerWidth/5;
       var height = window.innerWidth/8;
       var labels= false;
    }
    return (
    	<TreemapChart
        data={[{"values": this.props.barChartData.watsonData}]}
        width={width}
        height={height}
        colors={function(d) {
          return colorMap[d];
        }}
        title="BarChart"
        textColor="#484848"
        fontColor="12px"
      />

    )
  }
};

export default BarChart
