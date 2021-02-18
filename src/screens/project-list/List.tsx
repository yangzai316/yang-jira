import { Table } from 'antd';
import { User } from './Search';
interface ListItem {
  name: string;
  personId: string;
  id: string;
}

interface ListProps {
  list: ListItem[];
  users: User[];
}

export const List = ({ list, users }: ListProps) => {
  return (
    <Table
      rowKey="id"
      pagination={false}
      dataSource={list}
      columns={[
        {
          title: '项目名',
          dataIndex: 'name',
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
