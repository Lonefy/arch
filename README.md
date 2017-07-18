NodeJs+React+ES6+Webpack+SASS
========================================


项目页面:
-------

**各页:**
- 用户注册页面: localhost:3000/signup
- 用户登陆页面: localhost:3000/signin
- 用户详情列表页: localhost:3000/admin/user/list


项目结构:
----
```
├── node_modules        node模块目录
├── src                 静态文件目录
│   ├── app             主目录
│   │   ├── index.js    入口文件，负责加载对应的js、css和router启动
│   │   │               （无业务）
│   │   ├── components  公共组件目录，如paging
│   │   ├── containers  页面布局和全局处理文件
│   │   │   └── app 
│   │   │       ├── App.jsx 
│   │   │       └── app.style.scss 
│   │   ├── models      这里面放的是数据，类似我们模拟接口的 api/xxx.json
│   │   ├── routes      路由，提供给 app/index.js使用
│   │   ├── style
│   │   └── views       各个模块目录
│   │       ├── about   （jsx、css、img放在对应目录下）
│   │       └── home 
│   └── assets          经过xx文件所在目录
│       ├── adaptive.js
│       └── zepto.js
├── README.md
├── server.hot.reload.js          文件
├── webpack.config.babel.js       webpack文件
├── webpack.hot.reload.config.babel.js     webpack.reload.config文件
├── webpack.production.config.babel.js     webpack.production.config文件
└── package.json
```

