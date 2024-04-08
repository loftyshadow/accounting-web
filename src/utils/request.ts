/* eslint-disable camelcase */
import axios from 'axios';
import { useUserStore } from '@/stores/modules/user'
import { storeToRefs } from 'pinia';


// 创建axios实例
const service = axios.create({
    baseURL: import.meta.env.VITE_APP_SERVICE_API,
    timeout: 50000, // 请求超时时间：50s
    headers: { 'Content-Type': 'application/json;charset=utf-8' },
});

// 请求拦截器
service.interceptors.request.use(
    (config: any) => {
        if (!config.headers) {
            throw new Error(`Expected 'config' and 'config.headers' not to be undefined`);
        }
        const { isLogin, token } = storeToRefs(useUserStore());

        if (isLogin.value) {
            // 授权认证
            config.headers['Authorization'] = token;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

export default service;
