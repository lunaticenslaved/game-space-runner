import { Component, ErrorInfo, PropsWithChildren } from 'react';
import { Navigate } from 'react-router-dom';
import { Location, useLocation } from 'react-router';

import { routes } from '@client/navigation';
import { StyledLink } from '@client/shared/components/styled-link';

import style from './PageErrorBoundary.module.scss';

interface PageErrorBoundaryProps extends PropsWithChildren {
  location: Location;
}

interface PageErrorBoundaryState {
  error?: Error;
}

class PageErrorBoundaryWithRouter extends Component<
  PageErrorBoundaryProps,
  PageErrorBoundaryState
> {
  constructor(props: PageErrorBoundaryProps) {
    super(props);
    this.state = {};
  }

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error(error);
    console.error(info.componentStack);
  }

  render() {
    const { error } = this.state;

    if (!error) {
      return this.props.children;
    }

    const errorWithResponse = error as unknown as { response?: { status?: number } };

    if (errorWithResponse.response?.status === 500) {
      return location.pathname === routes.error.error404.path ? (
        this.props.children
      ) : (
        <Navigate to={routes.error.error500.path} />
      );
    }

    return (
      <div className={style.pageErrorBoundary}>
        <h1>Something went wrong.</h1>
        <StyledLink to={routes.home.path}>На главную</StyledLink>
      </div>
    );
  }
}

export const PageErrorBoundary = ({ children }: PropsWithChildren) => {
  const location = useLocation();

  return <PageErrorBoundaryWithRouter location={location}>{children}</PageErrorBoundaryWithRouter>;
};
