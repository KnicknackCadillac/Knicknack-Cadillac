import React from 'react'

const rd3 = require('react-d3');
const TreemapChart = rd3.Treemap;

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
    if(this.props.clicked){
      var width = window.innerWidth;
      var height = 250;
      var labels = true;
    }else{
       var width = window.innerWidth/5;
       var height = window.innerWidth/5;
       var labels = false;
    }
    return (
    	<TreemapChart
        data={this.props.treemapData.watsonData}
        width={width}
        height={height}
        title="Treemap"
        textColor="#484848"
        fontColor="12px"
        colors={function(d) {
          return colorMap[d];
        }}
        showInnerLabels={labels}
        showOuterLabels={labels}
      />

    )
  }
};

export default Treemap
