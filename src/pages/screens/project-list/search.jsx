import { Input, Select, Form } from 'antd';

export const Search = ({ params, setParams, users }) => {
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
              <Select.Option key={item.id} value={String(item.id)}>
                {item.name}
              </Select.Option>
            );
          })}
        </Select>
      </Form.Item>
    </Form>
  );
};
