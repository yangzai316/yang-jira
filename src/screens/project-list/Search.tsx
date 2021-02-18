import { Input, Select, Form } from 'antd';

export interface User {
  name: string;
  personId: string;
  id: string;
  token: string;
}
interface SearchProps {
  users: User[];
  params: {
    name: string;
    id: string;
  };
  setParams: (params: SearchProps['params']) => void;
}

export const Search = ({ params, setParams, users }: SearchProps) => {
  return (
    <Form layout="inline">
      <Form.Item>
        <Input
          value={params.name}
          onChange={(evt) =>
            setParams({
              ...params,
              name: evt.target.value,
            })
          }
        />
      </Form.Item>

      <Form.Item>
        <Select
          value={params.id}
          onChange={(value) =>
            setParams({
              ...params,
              id: value,
            })
          }
        >
          <Select.Option value="">申请人</Select.Option>
          {users.map((item) => {
            return (
              <Select.Option key={item.id} value={item.id}>
                {item.name}
              </Select.Option>
            );
          })}
        </Select>
      </Form.Item>
    </Form>
  );
};
