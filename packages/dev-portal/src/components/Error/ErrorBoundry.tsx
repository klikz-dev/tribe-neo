import { Component, FC } from 'react'

import { Card } from '@tribeplatform/react-ui-kit/Card'

export class ErrorBoundary extends Component<FC, { hasError: boolean }> {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI.
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.error({ error, errorInfo })
  }

  render() {
    if (this.state?.hasError) {
      // You can render any custom fallback UI
      return (
        <Card>
          <Card.Content>
            <h4>Something went wrong.</h4>
          </Card.Content>
        </Card>
      )
    }

    return this.props.children
  }
}
