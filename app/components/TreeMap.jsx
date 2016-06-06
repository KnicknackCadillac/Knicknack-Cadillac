;import React from 'react'

const rd3 = require('react-d3');
const TreemapChart = rd3.Treemap;

let colorMap = [
 'null', // 'skip
 '#E3A4F8 ', // 'Emotion Range
 '#EABB47 ', // 'Agreeableness'
 '#3BA0E1 ', // 'Extraversion'
 '#4DFF68 ', // 'Conscientiousness'
 '#FD7B6B '  // 'Openness'
];


class Treemap extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      treemapData: []
    }
  }

  render() {
    console.log(this.props.treemapData.watsonData);
    if(this.props.clicked){
      var width = window.innerWidth/1.4;
      var height = 450;
      var labels = true;
    }else{
       var width = window.innerWidth/3;
       var height = window.innerWidth/12;
       var labels = false;
    }
    return (
    	<TreemapChart
        data={this.props.treemapData.watsonData}
        width={width}
        height={height}
        title="Social Tendencies"
        textColor='#ffffff'
        colors={function(d) {
          return colorMap[d];
        }}
        showInnerLabels={labels}
        showOuterLabels={labels}
      />

    )
  }
};

export default Treemap;
