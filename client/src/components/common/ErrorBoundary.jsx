import React from 'react';
import { RotateCcw, Home, AlertCircle, Trash2 } from 'lucide-react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ClearPath ErrorBoundary caught exception:', error, errorInfo);
  }

  handleReload = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  handleGoHome = () => {
    this.setState({ hasError: false, error: null });
    window.location.href = '/';
  };

  handleResetCache = () => {
    try {
      localStorage.removeItem('clearpath_saved_careers');
      localStorage.removeItem('sahichayan_saved_careers');
      localStorage.removeItem('clearpath_results');
      localStorage.removeItem('sahichayan_results');
    } catch {}
    this.setState({ hasError: false, error: null });
    window.location.href = '/careers';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#FAF8F5] flex items-center justify-center p-6 text-stone-900">
          <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-stone-200 shadow-card text-center">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center mx-auto mb-4 border border-amber-200/60">
              <AlertCircle className="w-6 h-6" />
            </div>

            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400 block mb-1">
              Application Resilience
            </span>
            <h2 className="text-xl font-bold text-stone-900 tracking-tight">
              Temporary Navigation Disruption
            </h2>

            <p className="text-xs text-stone-500 mt-2 leading-relaxed">
              We encountered an unexpected layout state while updating this view. Your saved roadmaps and assessment profiles remain safely stored.
            </p>

            {this.state.error && (
              <div className="mt-4 p-3 bg-rose-50 border border-rose-200 rounded-xl text-left">
                <span className="text-[10px] font-bold uppercase tracking-wider text-rose-700 block mb-1">
                  Diagnostics
                </span>
                <p className="text-xs font-mono text-rose-900 break-words font-semibold">
                  {this.state.error.toString()}
                </p>
                {this.state.error.stack && (
                  <pre className="text-[10px] font-mono text-rose-800/80 mt-1 max-h-28 overflow-y-auto whitespace-pre-wrap">
                    {this.state.error.stack.split('\n').slice(0, 3).join('\n')}
                  </pre>
                )}
              </div>
            )}

            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-2.5">
              <button
                onClick={this.handleReload}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reload View</span>
              </button>

              <button
                onClick={this.handleGoHome}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <Home className="w-3.5 h-3.5" />
                <span>Return Home</span>
              </button>
            </div>

            <div className="mt-4 pt-3 border-t border-stone-100">
              <button
                onClick={this.handleResetCache}
                className="text-[11px] font-medium text-stone-400 hover:text-stone-700 inline-flex items-center gap-1 transition-colors cursor-pointer"
              >
                <Trash2 className="w-3 h-3" />
                <span>Reset View Cache &amp; Reopen Catalog</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
