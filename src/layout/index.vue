<template>
  <n-layout class="layout-container">
    <Header></Header>
    <n-layout has-sider>
      <Sidebar></Sidebar>
      <!-- <Content></Content> -->
      <RouterView></RouterView>
    </n-layout>
  </n-layout>
</template>

<script lang="ts" setup>
import Header from './header/index.vue'
import Sidebar from './sidebar/index.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<style lang="scss" scoped>
.sidebar-container {
  height: 100%;
  position: fixed;
  font-size: 0;
  top: 0;
  bottom: 0;
  left: 0;
  overflow: hidden;
}

.n-layout-header {
  padding: 24px;
}

.n-layout-footer {
  padding: 24px;
}

.layout-container {
  // 满屏
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
