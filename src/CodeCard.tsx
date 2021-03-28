import React from "react"
import { Card, CardProps, defaultCardProps } from "./Card";
import { Pyodide } from "./PyodideLoader";

interface CodeCardProps extends CardProps {
  honorific: string,
  pyodide: Pyodide,
}

type CodeCardState = {
  code: string,
  output: object,
}

export class CodeCard
  extends React.Component<CodeCardProps, CodeCardState> {

  state = {
    code: "",
    output: {},
  }

  static defaultProps = defaultCardProps

  render = () => (
    <Card startPosition={this.props.startPosition}>
      <p>Write some python, {this.props.honorific}</p>
      <textarea
        value={this.state.code}
        onChange={this.onCodeEdit}
        className="w-full font-mono my-1 px-1" />
      <pre>{JSON.stringify(this.state.output)}</pre>
    </Card>
  )

  onCodeEdit = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const code = event.target.value
    this.setState({ code })
    try {
      const output = this.props.pyodide.runPython(code)
      this.setState({ output })
    } catch (error) {
      // ignore
    }
  }
}
