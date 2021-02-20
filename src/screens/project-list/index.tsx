import { useEffect, useState } from 'react';
import { useDebounce, clearEmptyString } from '../../helper';

import { Fragment } from 'react';
import { Search } from './Search';
import { List } from './List';

import { useHttp } from './../../helper';

export const ProjectList = () => {
  const [params, setParams] = useState({
    name: '',
    id: '',
  });

  const debouncedParam = useDebounce(params, 500);
  const [list, setList] = useState([]);
  const request = useHttp();

  useEffect(() => {
    request('/projects', { data: clearEmptyString({ name: debouncedParam.name, personId: debouncedParam.id }) }).then((res) => setList(res));
    // eslint-disable-next-line
  }, [debouncedParam]);

  const [users, setUsers] = useState([]);

  useEffect(() => {
    request('/users', {}).then((res) => setUsers(res));
    // eslint-disable-next-line
  }, []);

  return (
    <Fragment>
      <h2>项目列表</h2>
      <Search params={params} setParams={setParams} users={users}></Search>
      <br />
      <List users={users} list={list}></List>
    </Fragment>
  );
};
