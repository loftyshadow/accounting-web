<template>
  <div class="background-color">
    <n-space vertical style="width: 160%">
      <n-card title="在线记账" size="huge">
        <n-form ref="formRef" :model="loginInfo" :rules="loginRules">
          <n-form-item path="userName" label="用户名">
            <n-input
              v-model:value="loginInfo.userName"
              autofocus
              class="mt-32 h-40 items-center"
              placeholder="请输入用户名"
              :maxlength="20"
            />
          </n-form-item>
          <n-form-item path="password" label="密码">
            <n-input
              v-model:value="loginInfo.password"
              type="password"
              show-password-on="mousedown"
              placeholder="请输入密码"
              :maxlength="20"
              @keydown.enter="handleSumbit"
            />
          </n-form-item>
        </n-form>
        <n-button type="primary" @click="handleSumbit"> 登录 </n-button>
      </n-card>
    </n-space>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/modules/user'
import { useRouter } from 'vue-router'
// 使用 bcrypt.js 进行密码加密
import bcrypt from 'bcryptjs'

const router = useRouter()
const { login } = useUserStore()
const notification = useNotification()
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
          return new Error('密码应为6~18位字母、数字、下划线')
        }
        return true
      },
      trigger: ['input', 'blur']
    }
  ]
}
const handleSumbit = async () => {
  await formRef.value?.validate((errors: any) => {
    if (errors) {
      notification.error({
        title: '用户名或密码格式错误',
        duration: 2000,
        closable: false
      })
    }
  })
  const cost = 10
  // 前端加密密码
  const hashedPassword = await bcrypt.hash(loginInfo.value.password, cost)
  // login({
  //   userName: loginInfo.value.userName,
  //   password: hashedPassword
  // })
  router.push('/today')
}
</script>

<style lang="scss" scoped>
.background-color::before {
  // 满屏
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: linear-gradient(135deg, #e66465, #9198e5);
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: #fff9;
}
</style>
