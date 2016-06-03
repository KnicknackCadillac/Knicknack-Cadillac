import React from 'react';

const rd3 = require('react-d3');
const PieChart = rd3.PieChart;
const width = window.innerWidth;
const height = window.innerWidth;
let colorMap = [
  '#E80521', // 'Anger'
  '#592684', // 'Disgust'
  '#325E2B', // 'Fear'
  '#FFD629', // 'Joy'
  '#086DB2', // 'Sadness'
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
        data={ this.props.pieData.tone }
        width={ width }
        height={ (height / 2) + 50 }
        radius={ (height / 4) - 20 }
        innerRadius={ (height / 4) - 50 }
        sectorBorderColor="white"
        colors={function(d) {
          return colorMap[d];
        }}
        title="Emotional Tone"
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
