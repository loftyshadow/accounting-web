/* eslint-disable camelcase */
import axios from 'axios';
import { useUserStore } from '@/stores/modules/user'
import { storeToRefs } from 'pinia';
import { useNotification, useDialog } from 'naive-ui'
import { toRefs } from 'vue';

// 创建axios实例
const service = axios.create({
    baseURL: import.meta.env.VITE_APP_SERVICE_API,
    timeout: 50000, // 请求超时时间：50s
    headers: { 'Content-Type': 'application/json;charset=utf-8' },
});
const notification = useNotification()
const dialog = useDialog()

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

// 响应拦截器
service.interceptors.response.use(
    (response) => {
        const res = response.data;
        const { code, msg } = res;
        if (code === 200) {
            return res;
        } else {
            // token过期
            if (code === -1) {
                handleError();
            } else {
                notification.error({
                    content: msg || '系统出错',
                    duration: 2500,
                    closable: false
                })
            }
            return Promise.reject(new Error(msg || 'Error'));
        }
    },
    (error) => {
        console.log('请求异常：', error);
        const { msg } = error.response.data;
        // 未认证
        if (error.response.status === 401) {
            handleError();
        } else {
            notification.error({
                content: '网络异常，请稍后再试!',
                duration: 2500,
                closable: false
            })
            return Promise.reject(new Error(msg || 'Error'));
        }
    },
);

// 统一处理请求响应异常
function handleError() {
    const userStore = useUserStore()
    const { isLogin } = toRefs(userStore);
    if (isLogin) {
        dialog.warning({
            title: '您的登录账号已失效，请重新登录',
            content: '是否再次登录？',
            positiveText: '再次登录',
            negativeText: '取消',
            onPositiveClick: () => {
                userStore.logout()
            },
            onNegativeClick: () => {
            }
        })
    }
}
export default service;
