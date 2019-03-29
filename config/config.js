import pageRoutes from './router.config';

export default {
    plugins: [
        [
            "umi-plugin-react", {
                antd: true,
                dva: true
            }
        ]
    ],
    routes: pageRoutes,
    proxy: {
        "/api": {
            "target": "http://192.168.5.76:5000/",
            "changeOrigin": true,
            "pathRewrite": { "^/api" : "" }
        }
    }
}