import React from 'react'

export interface CardProps {
  startPosition: Point,
}

export const defaultCardProps = { startPosition: { x: 10, y: 10 } }

type CardState = {
  position: Point,
  size: Point,
}

/**
 * A moveable and resizeable container.
 */
export class Card
  extends React.Component<CardProps, CardState> {

  static defaultProps = defaultCardProps

  constructor(props: CardProps) {
    super(props)
    this.state = {
      position: props.startPosition,
      size: { x: 220, y: 150 },
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
    <div className="absolute border rounded shadow 
    min-w-min overflow-hidden bg-gray-300"
      style={{
        left: this.state.position.x,
        top: this.state.position.y,
        width: this.state.size.x,
        height: this.state.size.y,
        minHeight: 100
      }}>
      <div className="h-7 cursor-move"
        onMouseDown={this.startMove}></div>
      <div className="p-1 bg-gray-100 h-full">
        {this.props.children}
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
      const diff = subtract(p1, p0)
      if (this.isBeingMoved) {
        this.setState(state => ({ position: add(state.position, diff) }))
      } else {
        this.setState(state => ({ size: add(state.size, diff) }))
      }
      this.prevCursorLoc = p1
    }
  }
}

type Point = {
  x: number,
  y: number,
}
const add = (p1: Point, p2: Point) => ({
  x: p1.x + p2.x,
  y: p1.y + p2.y,
})
const subtract = (p1: Point, p2: Point) => ({
  x: p1.x - p2.x,
  y: p1.y - p2.y,
})

type MouseEventt = MouseEvent | React.MouseEvent

const toPoint = (e: MouseEventt): Point =>
  ({ x: e.pageX, y: e.pageY })