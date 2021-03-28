import React from 'react'

export interface Pyodide {
  version: string,
  runPython: (code: string) => object,
  // More properties at
  // https://pyodide.org/en/latest/usage/api/js-api.html#pyodide
}

// The pyodide loader script injects the following names into the global scope
// (== window). This trick (thanks to [1]) makes typescript aware of them.
// [1] https://github.com/iodide-project/pyodide/issues/552#issuecomment-781770000
declare global {
  interface Window {
    languagePluginUrl: string,
    // This name is a remnant from the iodide notebook, when pyodide was a
    // language plugin for it.
    languagePluginLoader: Promise<undefined>,
    pyodide: Pyodide,
  }
}

/**
 * First load the small bootstrap script (pyodide.js).
 * As soon as this is loaded, it starts downloading all the heavy files.
 * We `await` this downloading.
 */
export class PyodideLoader
  extends React.Component<{ onLoad: (pyodide: Pyodide) => void }> {

  state = { text: "Loading Pyodide…" }

  t0: number

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
    const timeTaken = (performance.now() - this.t0) / 1000
    this.setState({ text: `Loaded Pyodide (${timeTaken.toFixed(1)} s)` })
    this.props.onLoad(window.pyodide)
  }

  componentDidMount = this.downloadLoader

  render = () => (
    <div className="absolute bottom-0 right-0">
      <p className="p-1">{this.state.text}</p>
    </div>)
}
