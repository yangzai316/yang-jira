import { FormEvent } from 'react';

const APIURL = process.env.REACT_APP_API_URL;
interface Param {
    username: string;
    password: string;
}
export const Login = () => {
    const login = (param: Param) => {
        fetch(`${APIURL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(param),
        }).then(async (res) => {
            if (res.ok) {
            }
        });
    };
    const handleSbumit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const username = (event.currentTarget.elements[0] as HTMLInputElement).value;
        const password = (event.currentTarget.elements[1] as HTMLInputElement).value;
        login({ username, password });
    };
    return (
        <form onSubmit={handleSbumit}>
            <div>
                <label htmlFor="username">用户名：</label>
                <input type="text" id="username" />
            </div>
            <div>
                <label htmlFor="password">密码：</label>
                <input type="password" id="password" />
            </div>
            <button type="submit">登陆</button>
        </form>
    );
};
