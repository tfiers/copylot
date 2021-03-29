import React from "react"
import { Draggable, DraggableProps, defaultDraggableProps } from "./Draggable";
import { Pyodide, PyProxy } from "./Pyodide";

interface CodeCardProps extends DraggableProps {
  honorific: string,
  pyodide?: Pyodide,
}

type CodeCardState = {
  code: string,
  output?: PyProxy,
}

export class CodeCard
  extends React.Component<CodeCardProps, CodeCardState> {

  state = {
    code: "",
    output: undefined,
  }

  static defaultProps = defaultDraggableProps

  render = () => (
    <Draggable startPosition={this.props.startPosition}>
      <p>Write some python, {this.props.honorific}</p>
      <textarea
        value={this.state.code}
        onChange={this.onCodeEdit}
        className="w-full font-mono my-1 px-1" />
      <pre>{(this.state.output ?? "").toString()}</pre>
    </Draggable>
  )

  onCodeEdit = async (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const code = event.target.value
    this.setState({ code })
    const pyodide = this.props.pyodide
    if (pyodide !== undefined) {
      try {
        const output = await pyodide.runPythonAsync(code)
        this.setState({ output })
      } catch (pythonError) {
        // ignore
      }
    }
  }
}
