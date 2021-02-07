export const List = ({ list, users }) => {
    return (
        <table border="1">
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
