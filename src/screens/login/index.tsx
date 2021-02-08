import { FormEvent } from 'react';

export const Login = () => {
    const handleSbumit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault;
    };
    return (
        <form onSubmit={handleSbumit}>
            <div>
                <label htmlFor="username">用户名：</label>
                <input type="text" id="username" />
            </div>
            <div>
                <label htmlFor="passeord">密码：</label>
                <input type="passeord" id="passeord" />
            </div>
            <button type="submit">登陆</button>
        </form>
    );
};
