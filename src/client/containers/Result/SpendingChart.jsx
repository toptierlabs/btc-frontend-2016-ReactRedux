import React, { PropTypes } from 'react';
import BarChart from '../../components/BarChart/BarChart.jsx';
import SizeMe from 'react-sizeme';
import d3 from 'd3';

function formatData(arr) {
    let newData = {
        labels: [],
        series: []
    };
    arr.forEach((item) => {
        let raised = item.total_in == null
            ? 0
            : item.total_in;
        let spent = item.total_out == null
            ? 0
            : (item.total_out);
        newData.labels.push(item.tran_date);
        newData.series[0].push(raised);
        newData.series[1].push(spent);
    }); 
    return newData;
}

function splitCodes (trans) {
  var obj = {}
  trans.forEach((item) => {
    if(item.direction=='out' && item.purposeCodes){
    let codes = item['purposeCodes'].split(';');
    codes.map((code) => {
      c = code.trim()
      if(c in obj){
        obj[c] += item.amount / codes.length; // NOTE - splitting based on length of codes in trans
      } else {
        obj[c] = 0;
      }
    })
  }
  })
  return obj
}


const SizeMeHOC = SizeMe({
  monitorWidth: true,
  monitorHeight: true,
  refreshRate: 16
});
const colors = [
    '#8dd3c7',
    '#ffffb3',
    '#bebada',
    '#fb8072',
    '#80b1d3',
    '#fdb462',
    '#b3de69',
    '#fccde5',
    '#2196F3',
    '#bc80bd',
    '#ccebc5',
    '#ffed6f',
    '#E91E63'
];

// NOTE: dummy data in the state right now
class SpendingChart extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          series: ['Spending'],
          data: [[175000],[13999],[21000],[89640],[3514],[25000],[19999]],
          labels: ['General Operational Expenses',
'Postage',
'Reimbursement for Personal Expenditures',
'Travel Expenses',
'Unknown',
'Management Services',
'Other Advertising (yard signs, buttons, etc.)'],
          colors: colors
      }
  }
  componentWillReceiveProps(nextProps) {
    const {labels, data} = nextProps;
    this.setState({...labels, ...data});
  }

  shouldComponentUpdate(nextProps, nextState) {
    if(nextState.data.length > 0){
      return true;
    }
    return false;
  }
  // componentWillMount() {
  //   const {labels, data} = this.props;
  // }

  render() {
    // if (_.isArray(this.props.data) && this.props.data.length === 5) {
      return (
        <div {...this.props}
          style={{ display: 'flex',
            flexFlow: 'row nowrap',
            alignItems: 'center'}}>
          <BarChart customStyle={{flex:'1'}}
          data={this.state.data}
          labels={this.state.labels}
          horizontal
          horizontalLabels
          dollarFormat
          colors={this.state.colors}
          opaque
           />
        </div>);
    // } else {
      // return <div>Loading...</div>
    // }
  }
}

export default SizeMeHOC(SpendingChart);