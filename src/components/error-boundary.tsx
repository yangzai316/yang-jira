import React from 'react';

type ErrorRender = (props: { error: Error | null }) => React.ReactElement;

// https://github.com/bvaughn/react-error-boundary
export class ErrorBoundary extends React.Component<React.PropsWithChildren<{ errorRender: ErrorRender }>, { error: Error | null }> {
  state = { error: null };

  // 当子组件抛出异常，这里会接收到并且调用
  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  render() {
    const { error } = this.state;
    const { errorRender, children } = this.props;
    if (error) {
      return errorRender({ error });
    }
    return children;
  }
}
