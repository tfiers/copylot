import React from 'react'
import { PyodideLoader } from './PyodideLoader'
import { CodeCard, Point } from './CodeCard'

export class App extends React.Component {
  render = () => (
    <div>
      <PyodideLoader />
      <CodeCard honorific="brother" />
      <CodeCard honorific="miss" startPosition={new Point(300, 10)} />
    </div>
  )
}
