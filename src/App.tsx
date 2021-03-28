import React from 'react'
import { PyodideLoader } from './PyodideLoader'
import { CodeCard } from './CodeCard'

export class App extends React.Component {
  render = () => (
    <div>
      <PyodideLoader />
      <CodeCard honorific="brother" />
      <CodeCard honorific="miss" startPosition={{ x: 300, y: 10 }} />
    </div>
  )
}
