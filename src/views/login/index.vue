<template>
    <n-space vertical>
        <n-form ref="formRef" :model="loginInfo" :rules="loginRules">
            <n-form-item path="userName" label="用户名">
                <n-input v-model:value="loginInfo.userName" autofocus class="mt-32 h-40 items-center"
                    placeholder="请输入用户名" :maxlength="20" />
            </n-form-item>
            <n-form-item path="password" label="密码">
                <n-input v-model:value="loginInfo.password" type="password" show-password-on="mousedown"
                    placeholder="请输入密码" :maxlength="20" @keydown.enter="login()" />
            </n-form-item>
        </n-form>
        <n-button type="primary" @click="login()">
            登录
        </n-button>
    </n-space>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {
    FormInst,
    FormItemInst,
    FormRules,
    FormItemRule,
    useMessage,
} from 'naive-ui'
import sysUserApi from '@/api/system/sys_user'
// 使用 bcrypt.js 进行密码加密
import bcrypt from 'bcryptjs';

const useLogin = () => {
    const message = useMessage()
    const formRef = ref<FormInst | null>(null)

    type LoginParam = {
        userName: String
        password: String
    }
    const loginInfo = ref<LoginParam>({})
    const loginRules: FormRules = {
        userName: [
            {
                required: true,
                message: '请输入用户名'
            }
        ],
        password: [
            {
                required: true,
                validator(rule: FormItemRule, value: string) {
                    if (!value) {
                        return new Error('需要输入密码')
                    } else if (!/^\w{6,18}$/.test(value)) {
                        return new Error('密码6~18位字母、数字、下划线')
                    }
                    return true
                },
                trigger: ['input', 'blur']
            }
        ],
    }
    const login = async () => {
        formRef.value?.validate((errors) => {
            if (!errors) {
                message.success('验证成功')
            } else {
                console.log(errors)
                message.error('验证失败')
                return
            }
        })
        const cost = 10;
        // 前端加密密码
        const hashedPassword = await bcrypt.hash(loginInfo.value.password, cost)
        sysUserApi.login({
            userName: loginInfo.value.userName,
            passwoed: hashedPassword
        })
    }
    return {
        loginInfo,
        login,
        loginRules,
        formRef
    }
}

const { loginInfo, login, loginRules, formRef } = useLogin()

</script>
