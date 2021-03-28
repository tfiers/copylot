import React from 'react'

export class Point {
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

type CodeCardProps = {
  startPosition: Point,
  honorific: string
}

type CodeCardState = {
  position: Point,
  size: Point,
}

export class CodeCard extends React.Component<CodeCardProps, CodeCardState> {

  static defaultProps = { startPosition: new Point(10, 10) }

  constructor(props: CodeCardProps) {
    super(props)
    this.state = {
      position: props.startPosition,
      size: new Point(220, 150),
    }
  }

  isBeingMoved: boolean = false
  isBeingResized: boolean = false
  prevCursorLoc: Point | null = null
  // Mouse location at previous mousemove event.

  componentDidMount = () => {
    window.addEventListener("mouseup", this.handleMouseUp)
    window.addEventListener("mousemove", this.handleMouseMove)
  }

  componentWillUnmount = () => {
    window.removeEventListener("mouseup", this.handleMouseUp)
    window.removeEventListener("mousemove", this.handleMouseMove)
  }

  render = () => (
    <div className="absolute bg-gray-100 border rounded shadow 
    min-w-min overflow-hidden"
      style={{
        left: this.state.position.x,
        top: this.state.position.y,
        width: this.state.size.x,
        height: this.state.size.y,
        minHeight: 100
      }}>
      <div className="h-7 bg-gray-300 cursor-move"
        onMouseDown={this.startMove}></div>
      <div className="p-1">
        <p>Write some python, {this.props.honorific}</p>
        <textarea className="w-full font-mono my-1" />
      </div>
      <div className="h-6 w-8 absolute -bottom-1 -right-1 cursor-resize"
        onMouseDown={this.startResize}></div>
    </div>
  )

  startMove = (e: MouseEventt) => {
    this.isBeingMoved = true
    this.startDrag(e)
  }

  startResize = (e: MouseEventt) => {
    this.isBeingResized = true
    this.startDrag(e)
  }

  startDrag = (e: MouseEventt) => {
    e.preventDefault()
    this.prevCursorLoc = toPoint(e)
  }

  handleMouseUp = () => {
    this.isBeingMoved = false
    this.isBeingResized = false
  }

  handleMouseMove = (e: MouseEventt) => {
    if (this.isBeingMoved || this.isBeingResized) {
      const p0 = this.prevCursorLoc as Point
      const p1 = toPoint(e)
      const diff = p1.subtract(p0)
      if (this.isBeingMoved) {
        this.setState(state => ({ position: state.position.add(diff) }))
      } else {
        this.setState(state => ({ size: state.size.add(diff) }))
      }
      this.prevCursorLoc = p1
    }
  }
}
