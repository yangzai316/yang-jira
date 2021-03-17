import { useEffect, useState, useRef } from 'react';
// 防抖
export const useDebounce = (value, delay) => {
  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceValue(value);
    }, delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounceValue;
};

const defaultInitalState = {
  error: null,
  data: null,
  status: 'idle',
};
export const useAsync = (initialSate) => {
  const [state, setState] = useState({
    ...defaultInitalState,
    ...initialSate,
  });

  const fetch = (promise) => {
    if (!promise || !promise.then) {
      throw new Error('请传入 Promise 类型数据');
    }
    setState({
      ...state,
      status: 'loading',
    });
    return promise
      .then((data) => {
        setState({
          error: null,
          data,
          status: 'success',
        });
      })
      .catch((error) => {
        setState({
          error,
          data: null,
          status: 'error',
        });
      });
  };

  return {
    fetch,
    ...state,
    isIdle: state.status === 'idle',
    isLoading: state.status === 'loading',
    isError: state.status === 'error',
    isSuccess: state.status === 'success',
  };
};

// 修改 document.title
export const useChangeTitle = function (title) {
  const oldTitle = useRef(document.title).current;

  useEffect(() => {
    document.title = title;
    return () => {
      document.title = oldTitle;
    };
  }, [title, oldTitle]);
};
