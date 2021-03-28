import React from 'react'

// The pyodide <script> (added below) injects the following names into the global scope (== window). This trick (thanks to https://github.com/iodide-project/pyodide/issues/552#issuecomment-781770000) makes typescript aware of them.
declare global {
  interface Window {
    languagePluginUrl: string,
    // This name is a remnant from the iodide notebook, when pyodide was a language plugin for it.
    languagePluginLoader: Promise<undefined>,
    pyodide: object,
  }
}

/**
 * First load the small bootstrap script (pyodide.js).
 * As soon as this is loaded, it starts downloading all the heavy files.
 * We `await` this downloading.
 */
export class PyodideLoader extends React.Component {

  state = { text: "Loading Pyodide…" }

  t0: number

  componentDidMount = () => {
    const script = document.createElement('script')
    script.src = "https://cdn.jsdelivr.net/pyodide/v0.17.0a2/full/pyodide.js"
    script.async = true
    script.onload = this.onload
    window.languagePluginUrl =
      "https://cdn.jsdelivr.net/pyodide/v0.17.0a2/full/"
    this.t0 = performance.now()
    document.head.appendChild(script)
  }

  onload = async () => {
    await window.languagePluginLoader
    const timeTaken = (performance.now() - this.t0) / 1000
    this.setState({ text: `Loaded Pyodide (${timeTaken.toFixed(1)} s)` })
  }

  render = () => (
    <div className="absolute bottom-0 right-0">
      <p className="p-1">{this.state.text}</p>
    </div>)
}
