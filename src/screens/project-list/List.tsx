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
        <table>
            <thead>
                <tr>
                    <th>项目名</th>
                    <th>项目负责人</th>
                </tr>
            </thead>
            <tbody>
                {list.map((item) => {
                    return (
                        <tr key={item.id}>
                            <td>{item.name}</td>
                            <td>{users.find((o) => o.personId === item.personId)?.name || '-'}</td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};
