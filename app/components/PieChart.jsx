import React from 'react';

const rd3 = require('react-d3');
const PieChart = rd3.PieChart;
const width = window.innerWidth;
const height = window.innerWidth;
let colorMap = [
  '#C8020A', // 'Anger'
  '#6EE017', // 'Disgust'
  '#FF006A', // 'Fear'
  '#FF7A06', // 'Joy'
  '#0099FF', // 'Sadness'
  // '#274b5f', // Language Style
  // '#1cb4a0', // Social Tendencies
];


class Chart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pieData: []
    }
  }

  render() {
    return (
      <PieChart
        data={ this.props.pieData.watsonData }
        width={ width }
        height={ (height / this.props.pieData.circleAttributes.height) + 50}
        radius={ (height / this.props.pieData.circleAttributes.radius) - 20}
        innerRadius={ (height / this.props.pieData.circleAttributes.innerRadius) - 10}
        // height={ (height / 2) + 50 }
        // radius={ (height / 4) - 20 }
        // innerRadius={ (height / 4) - 10 }
        sectorBorderColor="black"
        colors={function(d) {
          return colorMap[d];
        }}

        title={this.props.pieData.circleAttributes.title}
  
        showInnerLabels={false}

        showOuterLabels={false}
      />



    );
  }
}

export default Chart;

// propTypes: {
//   data:               React.PropTypes.array,
//   radius:             React.PropTypes.number,
//   cx:                 React.PropTypes.number,
//   cy:                 React.PropTypes.number,
//   labelTextFill:      React.PropTypes.string,
//   valueTextFill:      React.PropTypes.string,
//   valueTextFormatter: React.PropTypes.func,
//   colors:             React.PropTypes.func,
//   colorAccessor:      React.PropTypes.func,
//   title:              React.PropTypes.string,
//   showInnerLabels:    React.PropTypes.bool,
//   showOuterLabels:    React.PropTypes.bool,
//   sectorBorderColor:  React.PropTypes.string,
//   hoverAnimation:     React.PropTypes.bool
// },
