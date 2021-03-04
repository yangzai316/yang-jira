import styled from '@emotion/styled';
import { Row } from 'components/lib';
import { Dropdown, Menu, Button } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { Route, Routes, Navigate } from 'react-router';
import { BrowserRouter } from 'react-router-dom';

import { useChangeTitle } from 'helper';
import LogoSvg from 'assets/logo.svg';
import { useAuth } from 'context/auth-context';
import { ProjectList } from 'pages/screens/project-list';
import { ProjectDetail } from 'pages/screens/project-detail';

export const AuthenticatedApp = () => {
  useChangeTitle('项目列表');
  return (
    <div>
      <Head></Head>
      <Main>
        <BrowserRouter>
          <Routes>
            <Route path="/projects" element={<ProjectList />}></Route>
            <Route path={'/projects/:projectId/*'} element={<ProjectDetail />}></Route>
            <Navigate to="/projects"></Navigate>
          </Routes>
        </BrowserRouter>
      </Main>
    </div>
  );
};
const Head = () => {
  const { logout, user } = useAuth();
  const toHome = () => {
    window.location.href = '/';
  };
  return (
    <Header between={true}>
      <HeaderLeft gap={true}>
        <Logo onClick={toHome} />
        <h3>项目</h3>
        <h3>用户</h3>
      </HeaderLeft>
      <HeaderRight>
        <Dropdown
          placement="bottomRight"
          overlay={
            <Menu>
              <Menu.Item key="1">
                <Button onClick={logout} type="text">
                  登出
                </Button>
              </Menu.Item>
            </Menu>
          }
          trigger={['click']}
        >
          <Button type="text">
            {user?.name || 'YES'}
            <DownOutlined />
          </Button>
        </Dropdown>
      </HeaderRight>
    </Header>
  );
};
const Logo = styled.div`
  background: url(${LogoSvg}) no-repeat center;
  width: 100px;
  height: 32px;
  cursor: pointer;
`;
const HeaderLeft = styled(Row)``;
const HeaderRight = styled.div``;
const Header = styled(Row)`
  padding: 2.2rem 2.2rem;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  z-index: 1;
`;
const Main = styled.main`
  padding: 2.2rem 2.2rem;
`;
