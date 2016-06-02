import React from 'react';

const rd3 = require('react-d3');
const PieChart = rd3.PieChart;

class Chart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pieData: [
        {
          label: "Margarita",
          value: 50.0
        },
        {
          label: "John",
          value: 55.0
        },
        {
          label: "Tim",
          value: 25.0
        }
      ]
    }
  }

  render() {
    return (
      <PieChart
        data={this.state.pieData}
        width={450}
        height={400}
        radius={110}
        innerRadius={20}
        sectorBorderColor="white"
        title="Emotional Tone"
      />
    );
  }
}

export default Chart;

// ReactDOM.render(<Chart />, document.getElementById('container'));
