import { useAuth } from '../context/auth-context';
import { ProjectList } from './../screens/project-list';
import styled from '@emotion/styled';
import { Row } from 'components/lib';
import { Dropdown, Menu, Button } from 'antd';
import { DownOutlined } from '@ant-design/icons';

export const AuthenticatedApp = () => {
  const { logout, user } = useAuth();
  return (
    <div>
      <Header between={true}>
        <HeaderLeft gap={true}>
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
      <Main>
        <ProjectList />
      </Main>
    </div>
  );
};
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
