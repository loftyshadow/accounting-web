import { defineStore } from 'pinia';
import { ref } from 'vue'
import sysUserApi from '@/api/system/sys_user';
import { useRoute, useRouter } from 'vue-router';

export const useUserStore = defineStore('user', () => {
    const route = useRoute();
    const router = useRouter();
    const isLogin = ref(false);
    const token = ref<String>('');
    const userObj = ref({});
    const permList = ref([]);

    // 登录
    async function login(loginObj: any) {
        if (isLogin.value) {
            return;
        }
        const result: any = await sysUserApi.login({
            userName: loginObj.userName.trim(),
            password: loginObj.password.trim(),
        });
        if (result.code === 200) {
            isLogin.value = true;
            token.value = result.data;
            await getUserInfo();
            router.push('home')
        }
    }

    // 退出登录
    function logout(this: any) {
        // 清空pinia存储的数据
        this.$reset();
        window.localStorage.clear();
        window.sessionStorage.clear();

        // 跳转登录页
        router.push(`/login?redirect=${route.fullPath}`);
        location.reload(); // 强制刷新页面
    }

    // 获取用户的权限数据
    async function getUserInfo() {
        const result = await sysUserApi.getUserMenu();
        permList.value = result.data;
    }

    return { isLogin, login, logout, token, userObj, permList, getUserInfo };
});
