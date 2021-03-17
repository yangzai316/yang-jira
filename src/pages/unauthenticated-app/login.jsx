import { Form, Input, Button } from 'antd';
import { useAuth } from 'context/auth-context';
import { useAsync } from 'helper';
export const Login = () => {
  const { login } = useAuth();
  const { fetch, isLoading } = useAsync();
  const handleSbumit = async (values ) => {
    try {
      await fetch(login(values));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Form onFinish={handleSbumit}>
        <Form.Item name="username" rules={[{ required: true, message: 'Please input your username!' }]}>
          <Input placeholder="用户名：" />
        </Form.Item>
        <Form.Item name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
          <Input.Password placeholder="密码：" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block loading={isLoading}>
            登陆
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
