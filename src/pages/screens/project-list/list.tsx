import { Table } from 'antd';
import { User } from './search';

import { Link } from 'react-router-dom';
export interface ListItem {
  name: string;
  personId: string;
  id: string;
}

interface ListProps {
  list: ListItem[];
  users: User[];
  loading: boolean;
}

export const List = ({ loading, list, users }: ListProps) => {
  return (
    <Table
      rowKey="id"
      loading={loading}
      pagination={false}
      dataSource={list}
      columns={[
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
