import { useSearchParams } from 'react-router-dom';
import { useMemo } from 'react';

// 项目列表搜索的参数
export const useProjectsSearchParams = () => {
  const [param, setParam] = useUrlQueryParam(['name', 'id']);
  return [useMemo(() => ({ ...param, id: param.id || '' }), [param]), setParam];
};

/**
 * 返回页面url中，指定键的参数值
 */
export const useUrlQueryParam = (keys) => {
  const [searchParams, setSearchParam] = useSearchParams();
  return [
    useMemo(
      () => subset(Object.fromEntries(searchParams), keys),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [searchParams]
    ),
    (params) => {
      // iterator
      // iterator: https://codesandbox.io/s/upbeat-wood-bum3j?file=/src/index.js
      const o = cleanObject({
        ...Object.fromEntries(searchParams),
        ...params,
      });
      return setSearchParam(o);
    },
  ];
};

/**
 * 传入一个对象，和键集合，返回对应的对象中的键值对
 * @param obj
 * @param keys
 */
export const subset = (obj, keys) => {
  const filteredEntries = Object.entries(obj).filter(([key]) => keys.includes(key));
  return Object.fromEntries(filteredEntries);
};

export const cleanObject = (object) => {
  // Object.assign({}, object)
  const result = { ...object };
  Object.keys(result).forEach((key) => {
    const value = result[key];
    if (isVoid(value)) {
      delete result[key];
    }
  });
  return result;
};

export const isVoid = (value) => value === undefined || value === null || value === '';
