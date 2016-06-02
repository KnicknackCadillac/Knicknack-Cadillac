import React from 'react';

const rd3 = require('react-d3');
const PieChart = rd3.PieChart;

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
        data={this.props.pieData.tone}
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
