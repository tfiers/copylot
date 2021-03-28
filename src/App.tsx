import React from 'react'
import { CodeCard, Point } from './CodeCard'

export class App extends React.Component {
  render() {
    return (
      <div>
        <CodeCard honorific="brother" />
        <CodeCard honorific="miss" startPosition={new Point(300, 10)} />
      </div>
    )
  }
}
