import { ROUTES } from "@/constants";
import React, { Component, ReactNode } from "react";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

/**
 * Error Boundary component to catch React errors and display fallback UI
 * Prevents the entire app from crashing when a component errors
 */
class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    // Update state so the next render will show the fallback UI
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log error details for debugging
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.href = ROUTES.HOME;
  };

  render() {
    if (this.state.hasError) {
      // Custom fallback UI or use provided fallback
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen bg-western-overlay flex items-center justify-center p-4">
          <div className="max-w-2xl w-full">
            <div className="card-base p-8 sm:p-12 text-center">
              <div className="text-6xl mb-6" role="img" aria-label="warning">
                ⚠️
              </div>
              <h1 className="text-western-display text-3xl sm:text-4xl text-ink mb-4">
                Well, That Ain't Right
              </h1>
              <p className="text-base sm:text-lg text-text-dark/80 mb-2 font-body leading-relaxed">
                Something went wrong with the fiesta. Don't worry, we'll get you back on track!
              </p>
              
              {process.env.NODE_ENV === "development" && this.state.error && (
                <details className="mt-6 text-left bg-red-50 border border-red-200 rounded-lg p-4">
                  <summary className="cursor-pointer font-semibold text-red-800 text-sm">
                    Error Details (Development Only)
                  </summary>
                  <pre className="mt-3 text-xs text-red-700 overflow-auto">
                    {this.state.error.toString()}
                    {this.state.error.stack}
                  </pre>
                </details>
              )}

              <div className="mt-8 flex flex-wrap gap-3 justify-center">
                <button
                  onClick={this.handleReset}
                  className="btn"
                >
                  Back to Home
                </button>
                <button
                  onClick={() => window.location.reload()}
                  className="btn bg-brand-100 text-brand-700 hover:bg-brand-200"
                >
                  Reload Page
                </button>
              </div>

              <div className="mt-6 pt-6 border-t border-brand-200">
                <p className="text-sm text-muted">
                  If this problem persists, contact Nick.
                </p>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

