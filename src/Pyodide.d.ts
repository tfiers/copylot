// The pyodide loader script injects the following names into the global scope
// (== window). This trick makes typescript aware of them. (Thanks to:
// https://github.com/iodide-project/pyodide/issues/552#issuecomment-781770000 ).
declare global {
  interface Window {
    languagePluginUrl: string
    // This name is a remnant from the iodide notebook, when pyodide was a
    // language plugin for it.
    languagePluginLoader: Promise<void>
    pyodide: Pyodide
  }
}

export interface Pyodide {
  version: string

  runPython: (code: string) => PyProxy
  // (Doesn't load packages if any are imported in code).

  runPythonAsync: (code: string, onMsg?: MsgCallback, onErr?: ErrCallback)
    => Promise<PyProxy>
  // Loads packages imported in code, and runs code, both asynchronously.
  // The callbacks are passed to (and only used for) `loadPackagesFromImports`.

  loadloadPackagesFromImports: (code: string, onMsg?: MsgCallback, onErr?: ErrCallback)
    => Promise<void>

  loadPackage: (names: string | Array<string>, onMsg?: MsgCallback, onErr?: ErrCallback)
    => Promise<void>

  // More at https://pyodide.org/en/latest/usage/api/js-api.html#pyodide
}

type MsgCallback = (message: any) => void  // "progress messages"
type ErrCallback = (error: any) => void  // "error or warning messages".

export interface PyProxy {
  type: string
  toJs: (depth: number = Infinity) => object
  toString: () => string
  destroy: () => void
  length?: number

  // More at https://pyodide.org/en/latest/usage/api/js-api.html#pyproxy
}
