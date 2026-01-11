import { Component } from 'react';
import PropTypes from 'prop-types';
import { handleError, createErrorMessage } from '@shared/utils';

/**
 * ErrorBoundary - Catches React errors and displays fallback UI
 */
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('[ErrorBoundary] Caught error:', error, errorInfo);
    handleError(error, 'React Component');

    this.setState({
      error,
      errorInfo,
    });

    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });

    if (this.props.onReset) {
      this.props.onReset();
    }
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback({
          error: this.state.error,
          errorInfo: this.state.errorInfo,
          resetError: this.handleReset,
        });
      }

      return (
        <div className="flex items-center justify-center min-h-screen bg-black p-8">
          <div className="max-w-md w-full bg-gray-900 rounded-lg shadow-xl p-6 text-center">
            <div className="text-red-500 text-5xl mb-4">⚠️</div>
            <h1 className="text-2xl font-bold text-white mb-2">Oops! Something went wrong</h1>
            <p className="text-gray-400 mb-4">
              {createErrorMessage(this.state.error)}
            </p>

            {import.meta.env.VITE_ENABLE_DEBUG === 'true' && this.state.error && (
              <details className="mt-4 text-left">
                <summary className="cursor-pointer text-gray-500 hover:text-gray-300">
                  Technical Details
                </summary>
                <pre className="mt-2 p-3 bg-gray-800 rounded text-xs text-gray-300 overflow-auto max-h-40">
                  {this.state.error.toString()}
                  {this.state.errorInfo?.componentStack}
                </pre>
              </details>
            )}

            <button
              onClick={this.handleReset}
              className="mt-6 px-6 py-2 bg-primary hover:bg-primary-dark text-white rounded-md font-medium transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
  fallback: PropTypes.func,
  onError: PropTypes.func,
  onReset: PropTypes.func,
};

export default ErrorBoundary;

