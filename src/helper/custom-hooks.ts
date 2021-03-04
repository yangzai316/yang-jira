import { useEffect, useState, useRef } from 'react';
// 防抖
export const useDebounce = <V>(value: V, delay: number) => {
  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceValue(value);
    }, delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounceValue;
};

// 请求的二次封装，配合loading
interface State<D> {
  error: Error | null;
  data: D | null;
  status: 'idle' | 'loading' | 'error' | 'success';
}

const defaultInitalState: State<null> = {
  error: null,
  data: null,
  status: 'idle',
};
export const useAsync = <D>(initialSate?: State<D>) => {
  const [state, setState] = useState<State<D>>({
    ...defaultInitalState,
    ...initialSate,
  });

  const fetch = (promise: Promise<D>) => {
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
export const useChangeTitle = function (title: string) {
  const oldTitle = useRef(document.title).current;
  useEffect(() => {
    document.title = title;
    return () => {
      document.title = oldTitle;
    };
  }, [title, oldTitle]);
};
