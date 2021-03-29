import React from "react"
import { Card, CardProps, defaultCardProps } from "./Card";
import { Pyodide, PyProxy } from "./Pyodide";

interface CodeCardProps extends CardProps {
  honorific: string,
  pyodide: Pyodide,
}

type CodeCardState = {
  code: string,
  output?: PyProxy,
}

export class CodeCard
  extends React.Component<CodeCardProps, CodeCardState> {

  state = {
    code: "",
    output: null,
  }

  static defaultProps = defaultCardProps

  render = () => (
    <Card startPosition={this.props.startPosition}>
      <p>Write some python, {this.props.honorific}</p>
      <textarea
        value={this.state.code}
        onChange={this.onCodeEdit}
        className="w-full font-mono my-1 px-1" />
      <pre>{(this.state.output ?? "").toString()}</pre>
    </Card>
  )

  onCodeEdit = async (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const code = event.target.value
    this.setState({ code })
    const pyodide = this.props.pyodide;
    try {
      const output = await pyodide.runPythonAsync(code)
      this.setState({ output })
    } catch (pythonError) {
      // ignore
    }
  }
}
