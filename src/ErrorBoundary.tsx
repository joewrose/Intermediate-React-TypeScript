import { Component, ErrorInfo } from "react";
// Error Boundaries must be class components.
import { Link, Navigate } from "react-router-dom";

class ErrorBoundary extends Component {
  state = { hasError: false, redirect: false };

  // Called when an error occurs. Effectively, the object which
  // is returned is passed directly into a setState call.
  static getDerivedStateFromError() {
    return { hasError: true };
  }

  // All this does is report the error to the log.
  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error(error, info);
  }

  componentDidUpdate() {
    if (this.state.hasError) {
      setTimeout(() => this.setState({ redirect: true }), 5000);
    }
  }

  // Every time you run setState, the render function will be called
  render() {
    if (this.state.redirect) {
      return <Navigate to="/" />;
    } else if (this.state.hasError) {
      return (
        <h2>
          There was an error. Oh dear. <Link to="/">Click here</Link> to go back
          to the homepage. Or wait five seconds.
        </h2>
      );
    }

    // If there was no error, just return the contents of the tag
    // that was going to be rendered anyway.
    return this.props.children;
  }
}

export default ErrorBoundary;
