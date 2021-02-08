export const clearEmptyString = (data: { [key: string]: any }) => {
    const _ = Object.assign({}, data);
    Object.keys(_).forEach((item) => {
        if (_[item] === '') {
            delete _[item];
        }
    });
    return _;
};
