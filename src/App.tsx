import React from 'react';
import './App.css';

class Point {
  constructor(public x: number, public y: number) { }
  add = (other: Point) =>
    new Point(this.x + other.x, this.y + other.y)
  subtract = (other: Point) =>
    new Point(this.x - other.x, this.y - other.y)
}

const toPoint = (e: React.MouseEvent) =>
  new Point(e.pageY, e.pageY)

type CodeCellState = {
  isBeingDragged: boolean
  offset: Point
}

class CodeCell extends React.Component<
  { honorific: string }, CodeCellState> {

  state: CodeCellState = {
    isBeingDragged: false,
    offset: new Point(0, 0)
  }

  dragStart: Point | null = null

  render = () => (
    <div className="CodeCell"
      onMouseDown={this.handleMouseDown}
      onMouseMove={this.handleMouseMove}
      onMouseUp={this.handleMouseUp}
      style={{
        left: this.state.offset.x,
        top: this.state.offset.y
      }}>
      <p>write some python, {this.props.honorific}</p>
      <textarea />
      <p>
        {this.state.offset.x}, {this.state.offset.x}, {this.state.isBeingDragged ? "yo" : "no"}
      </p>
    </div>
  )

  handleMouseDown = (e: React.MouseEvent) => {
    this.dragStart = toPoint(e)
    this.setState({ isBeingDragged: true })
  }

  handleMouseUp = (e: React.MouseEvent) => {
    this.setState({ isBeingDragged: false })
  }

  handleMouseMove = (e: React.MouseEvent) => {
    if (this.state.isBeingDragged) {
      const p0 = this.dragStart as Point
      const p1 = toPoint(e)
      const diff = p1.subtract(p0)
      this.setState((state) => (
        { offset: state.offset.add(diff) }
      ))
    }
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
