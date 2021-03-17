// 清除对象value为''的属性
export const clearEmptyString = (data ) => {
  const _ = Object.assign({}, data);
  Object.keys(_).forEach((item) => {
    if (_[item] === '') {
      delete _[item];
    }
  });
  return _;
};
