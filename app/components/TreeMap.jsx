import React from 'react'

const rd3 = require('react-d3');
const TreemapChart = rd3.Treemap;
var treemapData = [{label: 'China', value: 1364}, {label: 'India', value: 1296}, {label: 'United States', value: 318}, {label: 'Indonesia', value: 251}, {label: 'Brazil', value: 203}];
const width = window.innerWidth;
const height = window.innerWidth;
let colorMap = [
  '#C8020A', // 'Anger'
  '#6EE017', // 'Disgust'
  '#FF006A', // 'Fear'
  '#FF7A06', // 'Joy'
  '#0099FF', // 'Sadness'
];


class Treemap extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      treemapData: []
    }
  }

  render() {
    return (
    	<TreemapChart
        data={this.props.treemapData.watsonData}
        width={450}
        height={250}
        title="Treemap"
        textColor="#484848"
        fontColor="12px"
      />

    )
  }
};

export default Treemap