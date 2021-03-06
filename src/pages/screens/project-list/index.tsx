import React, { useEffect, useState } from 'react';
import { useDebounce, clearEmptyString, useAsync, useHttp, useChangeTitle, useUrlQueryParam } from 'helper';

import { Search } from './search';
import { List, ListItem } from './list';
export interface Ke {
  name: string;
  personId: string;
}

export const ProjectList = () => {
  useChangeTitle('项目列表');

  // const [params, setParams] = useState({
  //   name: '',
  //   id: '',
  // });
  const [params, setParams] = useUrlQueryParam(['name', 'id']);
  const debouncedParam = useDebounce(params, 500);
  const request = useHttp();
  const { isLoading, data, fetch } = useAsync<ListItem[]>();

  useEffect(() => {
    fetch(request('/projects', { data: clearEmptyString({ name: debouncedParam.name, personId: debouncedParam.id }) }));
    // eslint-disable-next-line
  }, [debouncedParam]);

  const [users, setUsers] = useState([]);

  useEffect(() => {
    request('/users', {}).then((res) => setUsers(res));
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <h2>项目列表</h2>
      <Search params={params} setParams={setParams} users={users}></Search>
      <br />
      <List loading={isLoading} users={users} list={data || []}></List>
    </>
  );
};
