import { FormEvent } from 'react';
import { useAuth } from '../context/auth-context';

export const Register = () => {
  const { register } = useAuth();
  const handleSbumit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const username = (event.currentTarget.elements[0] as HTMLInputElement).value;
    const password = (event.currentTarget.elements[1] as HTMLInputElement).value;
    register({ username, password });
  };
  return (
    <div>
      <form onSubmit={handleSbumit}>
        <div>
          <label htmlFor="username">用户名：</label>
          <input type="text" id="username" />
        </div>
        <div>
          <label htmlFor="password">密码：</label>
          <input type="password" id="password" />
        </div>
        <button type="submit">注册</button>
      </form>
    </div>
  );
};
