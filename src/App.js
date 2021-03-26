import React from 'react';
import './App.css';

class CodeCell extends React.Component {
  state = {
    x_offset: 0,
    y_offset: 0,
  }

  render = () => (
    <div onMouseDown={this.handleMouseDown} className="CodeCell">
      <p>write some python, {this.props.honorific}</p>
      <textarea />
    </div>
  )

  handleMouseDown = (e) => {

  }
}

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <CodeCell honorific="brother" />
        <CodeCell honorific="miss" />
      </div>
    )
  }
}

export default App;
