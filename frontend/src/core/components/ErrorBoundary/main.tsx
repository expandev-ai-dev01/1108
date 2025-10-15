import { Component, ReactNode, ErrorInfo } from 'react';
import type { ErrorBoundaryProps, ErrorBoundaryState } from './types';

/**
 * @component ErrorBoundary
 * @summary Catches and handles React errors gracefully
 * @domain core
 * @type error-boundary
 * @category error-handling
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="flex min-h-screen items-center justify-center bg-gray-50">
            <div className="max-w-md rounded-lg bg-white p-8 shadow-lg">
              <h2 className="mb-4 text-2xl font-bold text-red-600">Algo deu errado</h2>
              <p className="mb-4 text-gray-600">
                Ocorreu um erro inesperado. Por favor, tente novamente.
              </p>
              <button
                onClick={() => this.setState({ hasError: false, error: null })}
                className="rounded bg-primary-600 px-4 py-2 text-white hover:bg-primary-700"
              >
                Tentar novamente
              </button>
            </div>
          </div>
        )
      );
    }

    return this.props.children;
  }
}
