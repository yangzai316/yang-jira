import React from 'react';
import './App.css';
import { useAuth } from 'context/auth-context';
import { AuthenticatedApp } from 'pages/authenticated-app';
import { UnauthenticatedApp } from 'pages/unauthenticated-app';
import styled from '@emotion/styled';
import { Spin } from 'antd';
import { ErrorBoundary } from 'components/error-boundary';

function App() {
  const { user, loading } = useAuth();
  return (
    <ErrorBoundary errorRender={errorPage}>
      <div className="App">
        {!loading ? (
          user ? (
            <AuthenticatedApp />
          ) : (
            <UnauthenticatedApp />
          )
        ) : (
          <FullPage>
            <Spin />
          </FullPage>
        )}
      </div>
    </ErrorBoundary>
  );
}

const FullPage = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const errorPage = ({ error } ) => {
  return <h1>报错了：{error?.message}</h1>;
};
export default App;
