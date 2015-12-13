import React, { Component } from 'react';
import ChildComponent from './ChildComponent';
import _ from 'lodash';

import '../app.less';

import visualiseRender from 'react-render-visualizer-decorator';

@visualiseRender
export default class App extends Component {
  constructor () {
    super();
    this.state = {
      childComponentsNumber: 2,
    };
  }

  appendChildComponent () {
    this.setState({
      childComponentsNumber: (this.state.childComponentsNumber + 1)
    })
  }

  render () {
    return (<div className="mainComponent">
      <h1>React render visualizer decorator demo</h1>
      <p><button onClick={() => this.appendChildComponent()}>Add another child component</button></p>
      {_.times(this.state.childComponentsNumber, (i) => {
        return (<ChildComponent key={i} />);
      })}
    </div>);
  }
}
