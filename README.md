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
