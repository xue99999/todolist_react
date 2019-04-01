export default [
    {
        path: '/login',
        name: '登录',
        component: './login',
    },
    {
        path: '/register',
        name: '注册',
        component: './register',
    },
    // 登录成功之后的路由
    {
        path: '/',
        component: '../layouts/index',
        routes: [
            { path: '/', redirect: '/todo' },
            {
                path: '/todo',
                name: '首页',
                component: './index',
            },
            {
                path: '/todo/add',
                name: '添加todo',
                component: './add',
            },
            {
                path: '/my',
                name: '个人中心',
                component: './my',
            },
        ]
    },
]