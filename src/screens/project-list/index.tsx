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
    request('/projects', { data: clearEmptyString({ name: debouncedParam.name, id: debouncedParam.id }) }).then((res) => setList(res));
  }, [debouncedParam]);

  const [users, setUsers] = useState([]);

  useEffect(() => {
    request('/users', {}).then((res) => setUsers(res));
  }, []);

  return (
    <Fragment>
      <Search params={params} setParams={setParams} users={users}></Search>
      <List users={users} list={list}></List>
    </Fragment>
  );
};
