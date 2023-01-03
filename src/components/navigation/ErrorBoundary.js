import React from "react";

import Note from "../../components/common/Note";

import { NOTE_ERROR_OCCURRED } from "../../constants";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  // componentDidCatch(error, errorInfo) {
  //   // You can also log the error to an error reporting service
  // }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI

      return (
        <div style={{ padding: "16px" }}>
          <Note details={NOTE_ERROR_OCCURRED} />
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
