
import React from 'react';
const rd3 = require('react-d3');
const Bar = rd3.BarChart;
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
    if(this.props.clicked){
      var width = window.innerWidth/1.3;
      var height = 450;
      var labels = true;
    }else{
       var width = window.innerWidth/5;
       var height = window.innerWidth/10;

       var labels= false;
       //console.log('this is bar data: ', this.props.barChartData.watsonData)

    }
    return (

    	<Bar
        data={[{"values": this.props.barChartData.watsonData}]}
        width={width}
        height={height}
        colors={function(d) {
          return colorMap[d];
        }}
        title="Language Tone"
        textColor='#ffffff'
      />

    )
  }
};

export default BarChart;
