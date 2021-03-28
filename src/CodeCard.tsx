import React from "react"
import { Card, CardProps, defaultCardProps } from "./Card";

interface CodeCardProps extends CardProps {
  honorific: string,
}

type CodeCardState = {
  code: string,
  output: string,
}

export class CodeCard
  extends React.Component<CodeCardProps, CodeCardState> {

  static defaultProps = defaultCardProps

  render = () => (
    <Card startPosition={this.props.startPosition}>
      <p>Write some python, {this.props.honorific}</p>
      <textarea className="w-full font-mono my-1" />
    </Card>
  )
}
