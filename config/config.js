import pageRoutes from './router.config';

export default {
    history: 'hash',
    plugins: [
        [
            "umi-plugin-react", {
                antd: true,
                dva: true,
                dynamicImport: {
                    loadingComponent: './components/Loading/index.js',
                },
            },
        ]
    ],
    routes: pageRoutes,
    proxy: {
        "/api": {
            "target": "http://192.168.5.76:5000/",
            "changeOrigin": true,
            "pathRewrite": {
                "^/api" : "" 
            }
        }
    }
}