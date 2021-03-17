import { useEffect, useState } from 'react'; 
import { ReloadOutlined } from '@ant-design/icons';
import { useDebounce, clearEmptyString, useAsync, useHttp, useChangeTitle, useProjectsSearchParams } from 'helper';

import { Search } from './search';
import { List } from './list';
 
export const ProjectList = () => {
  useChangeTitle('项目列表');

  const [params, setParams] = useProjectsSearchParams();
  const debouncedParam = useDebounce(params, 500);
  const request = useHttp();
  const { isLoading, data, fetch } = useAsync();

  const [updateKey, setUpdate] = useState(0);
  useEffect(() => {
    fetch(request('/projects', { data: clearEmptyString({ name: debouncedParam.name, personId: debouncedParam.id }) }));
    // eslint-disable-next-line
  }, [debouncedParam,updateKey]);

  const [users, setUsers] = useState([]);


  useEffect(() => {
    request('/users', {}).then((res) => setUsers(res));
    // eslint-disable-next-line
  }, []);
 

  return (
    <>
      <div>
        <h2>项目列表 </h2>
        <ReloadOutlined onClick={() => setUpdate((pre) => pre + 1)} />
      </div>

      <Search params={params} setParams={setParams}  users={users}></Search>
      <br />
      <List loading={isLoading} users={users} list={data || []} setUpdate={setUpdate}></List>
    </>
  );
};
