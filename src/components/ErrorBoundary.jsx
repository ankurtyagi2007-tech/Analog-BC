import { Component } from 'react'

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: 32, fontFamily: 'Inter, sans-serif', color: '#2C1810', background: '#F5F0E1', minHeight: '100vh' }}>
          <h1 style={{ fontSize: 24, marginBottom: 12 }}>Something went wrong</h1>
          <pre style={{ fontSize: 13, whiteSpace: 'pre-wrap', color: '#C67B5C' }}>
            {this.state.error?.message}
          </pre>
          <button
            onClick={() => window.location.reload()}
            style={{ marginTop: 20, padding: '10px 24px', background: '#2C1810', color: '#F5F0E1', border: 'none', borderRadius: 24, cursor: 'pointer', fontSize: 14 }}
          >
            Reload
          </button>
        </div>
      )
    }
    return this.props.children
  }
}
