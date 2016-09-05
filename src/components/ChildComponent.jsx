import React, { Component } from 'react';
import visualiseRender from 'react-render-visualizer-decorator';

@visualiseRender
export default class ChildComponent extends Component {
  generateNumber() {
    this.setState({
      number: Math.ceil(Math.random() * 1000000000)
    });
  }

  disableSelect(e) {
    e.preventDefault();
  }

  render() {
    return (<div className="childComponent" onClick={() => this.generateNumber()} onMouseDown={e => this.disableSelect(e)}>
      Click to generate a random number. <strong>{this.state.number}</strong>
    </div>);
  }
}
