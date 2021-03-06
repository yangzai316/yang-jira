#### 环境变量

配置 env 环境变量

1. 开发环境新建文件 .env.development
2. 线上环境新建文件 .env

```
REACT_APP_API_URL=xxx
```

必须以 REACT*APP* 开头才能被识别

```jvascript
// js 文件通过  process.env. 可以拿到设置的值
const APIURL = process.env.REACT_APP_API_URL;
```

#### 自定义 hook

1. hook 只能用于 hook 中；
2. hook 只能用于函数组件中；

#### 状态提升

将多个子组件需要的数据，通过公共父组件通过 prop 传递下去

#### 对象对 hooks 的影响

- 自定义一个对象( obj )，传给 useEffect **会**导致无限循环，因为：js 认为 obj !== obj
- useState 返回的对象（ obj ），传给 useEffect **不会**导致无限循环，因为：react 认为调用 useState 返回的 setState 才视为 obj 被改变

#### why-did-you-render

监听 render 触发点，避免重复渲染

#### useSearchParams

使用 useSearchParams 管理路由 query 参数
