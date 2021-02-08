import { useEffect, useState } from 'react';
import { useDebounce, clearEmptyString } from '../../helper';
import * as qs from 'qs';

import { Fragment } from 'react';
import { Search } from './Search';
import { List } from './List';

const APIURL = process.env.REACT_APP_API_URL;

export const ProjectListScreen = () => {
    const [params, setParams] = useState({
        name: '',
        personId: '',
    });

    const debouncedParam = useDebounce(params, 500);
    const [list, setList] = useState([]);

    useEffect(() => {
        fetch(`${APIURL}/projects?${qs.stringify(clearEmptyString({ name: debouncedParam.name, personId: debouncedParam.personId }))}`).then(
            async (res) => {
                if (res.ok) {
                    setList(await res.json());
                }
            }
        );
    }, [debouncedParam]);

    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch(`${APIURL}/users`).then(async (res) => {
            if (res.ok) {
                setUsers(await res.json());
            }
        });
    }, []);

    return (
        <Fragment>
            <Search params={params} setParams={setParams} users={users}></Search>
            <List users={users} list={list}></List>
        </Fragment>
    );
};
