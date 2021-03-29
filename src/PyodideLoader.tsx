import React from 'react'
import { Pyodide } from './Pyodide'

/**
 * First load the small bootstrap script (pyodide.js).
 * As soon as this is loaded, it starts downloading all the heavy files.
 * We `await` this downloading.
 */
export class PyodideLoader
  extends React.Component<{ onLoad: (pyodide: Pyodide) => void }> {

  state = { text: "Loading Pyodide…" }

  t0?: number

  downloadLoader = () => {
    const script = document.createElement('script')
    script.src = "https://cdn.jsdelivr.net/pyodide/v0.17.0a2/full/pyodide.js"
    script.async = true
    script.onload = this.onLoaderDownloaded
    window.languagePluginUrl =
      "https://cdn.jsdelivr.net/pyodide/v0.17.0a2/full/"
    this.t0 = performance.now()
    document.head.appendChild(script)
  }

  onLoaderDownloaded = async () => {
    await window.languagePluginLoader
    const timeTaken = (performance.now() - (this.t0 as number)) / 1000
    this.setState({ text: `Loaded Pyodide (${timeTaken.toFixed(1)} s)` })
    this.props.onLoad(window.pyodide)
  }

  componentDidMount = this.downloadLoader

  render = () => (
    <div className="absolute bottom-0 right-0">
      <p className="p-1">{this.state.text}</p>
    </div>)
}
