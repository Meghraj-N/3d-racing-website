import { Component, type ErrorInfo, type ReactNode } from 'react';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black text-red-500 p-8">
          <div className="max-w-2xl bg-gray-900 p-6 rounded-lg border border-red-900">
            <h1 className="text-2xl font-bold mb-4">Application Error</h1>
            <pre className="text-xs overflow-auto">{this.state.error?.toString()}</pre>
            <pre className="text-xs overflow-auto mt-4">{this.state.error?.stack}</pre>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
