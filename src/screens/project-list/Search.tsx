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
    <form>
      <div>
        <input
          type="text"
          value={params.name}
          onChange={(evt) =>
            setParams({
              ...params,
              name: evt.target.value,
            })
          }
        />
        <select
          value={params.id}
          onChange={(evt) =>
            setParams({
              ...params,
              id: evt.target.value,
            })
          }
        >
          <option value="">申请人</option>
          {users.map((item) => {
            return (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            );
          })}
        </select>
      </div>
    </form>
  );
};
