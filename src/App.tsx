import React from 'react'
import { PyodideLoader } from './PyodideLoader'
import { CodeCard } from './CodeCard'

export class App extends React.Component {

  state = { pyodide: undefined }

  render = () => (
    <div>
      <PyodideLoader
        onLoad={pyodide => this.setState({ pyodide })}
      />
      <CodeCard
        honorific="brother"
        pyodide={this.state.pyodide}
      />
      <CodeCard
        honorific="miss"
        pyodide={this.state.pyodide}
        startPosition={{ x: 300, y: 10 }}
      />
    </div>
  )

}
