import { Table } from 'antd';
import { Collection } from 'components/collection';
import { Link } from 'react-router-dom';
import { useHttp } from 'helper';

export const List = ({ loading, list, users, setUpdate }) => {
  const request = useHttp();
  const handleCollection = (personId) => {
    request(`/projects/${personId}`, {}).then(() => setUpdate());
  };
  return (
    <Table
      rowKey="id"
      loading={loading}
      pagination={false}
      dataSource={list}
      columns={[
        {
          title: '收藏',
          dataIndex: 'name',
          render: (name, { personId }) => (
            <Collection
              is={true}
              onChange={() => {
                handleCollection(personId);
              }}
            ></Collection>
          ),
        },
        {
          title: '项目名',
          dataIndex: 'name',
          render: (name, { personId }) => <Link to={`/projects/${personId}`}>{name}</Link>,
        },
        {
          title: '项目负责人',
          dataIndex: 'personId',
          render: (personId) => users?.find((o) => o.id === personId)?.name || '--',
        },
      ]}
    />
  );
};
