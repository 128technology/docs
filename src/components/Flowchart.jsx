import React from 'react';
import PropTypes from 'prop-types';
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

class Flowchart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    if (ExecutionEnvironment.canUseDOM) {
      this.setState({
        Flowchart: require('react-simple-flowchart').default,
      });
    }
  }

  render() {
    const {Flowchart} = this.state;
    const {chartCode, scale = 0.7} = this.props;

    if (!ExecutionEnvironment.canUseDOM || !Flowchart) {
      return <div />;
    }

    return (
      <div style={{overflowX: 'scroll'}}>
        <Flowchart options={{scale}} chartCode={chartCode} />
      </div>
    );
  }
}

Flowchart.propTypes = {
  chartCode: PropTypes.string.isRequired,
  scale: PropTypes.number,
};

export default Flowchart;
