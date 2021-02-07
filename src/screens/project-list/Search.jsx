import { useEffect, useState } from 'react';

export const Search = ({ params, setParams, users }) => {
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
                    value={params.personId}
                    onChange={(evt) =>
                        setParams({
                            ...params,
                            personId: evt.target.value,
                        })
                    }
                >
                    <option value="">申请人</option>
                    {users.map((item) => {
                        return (
                            <option key={item.personId} value={item.personId}>
                                {item.name}
                            </option>
                        );
                    })}
                </select>
            </div>
        </form>
    );
};
