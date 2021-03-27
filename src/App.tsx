import React from 'react';
import './App.css';

class Point {
  constructor(
    public x: number,
    public y: number,
  ) { }

  add = (other: Point) =>
    new Point(
      this.x + other.x,
      this.y + other.y
    )

  subtract = (other: Point) =>
    new Point(
      this.x - other.x,
      this.y - other.y
    )
}

type MouseEventt = MouseEvent | React.MouseEvent

const toPoint = (e: MouseEventt) =>
  new Point(e.pageX, e.pageY)

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

  prevCursorLoc: Point | null = null
  // At previous mousemove event.

  constructor(props) {
    super(props)
    window.addEventListener("mouseup", this.handleMouseUp)
    window.addEventListener("mousemove", this.handleMouseMove)
  }

  render = () => (
    <div className="CodeCell"
      style={{
        transform:
          `translate(${this.state.offset.x}px, ${this.state.offset.y}px)`,
      }}>
      <div className="handlebar" onMouseDown={this.handleMouseDown}></div>
      <div className="inner">
        <p>write some python, {this.props.honorific}</p>
        <textarea />
        <p>
          {this.state.offset.x}, {this.state.offset.y}, {this.state.isBeingDragged ? "yo" : "no"}
        </p>
      </div>
    </div>
  )

  handleMouseDown = (e: MouseEventt) => {
    e.preventDefault()
    this.prevCursorLoc = toPoint(e)
    this.setState({ isBeingDragged: true })
  }

  handleMouseUp = () => {
    if (this.state.isBeingDragged) {
      this.setState({ isBeingDragged: false })
    }
  }

  handleMouseMove = (e: MouseEventt) => {
    if (this.state.isBeingDragged) {
      const p0 = this.prevCursorLoc as Point
      const p1 = toPoint(e)
      const diff = p1.subtract(p0)
      this.setState((state) => (
        { offset: state.offset.add(diff) }
      ))
      this.prevCursorLoc = p1
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
