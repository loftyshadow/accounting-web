<template>
  <div>sefsefewfsefsef</div>
  <n-layout has-sider>
    <n-layout-sider
      bordered
      collapse-mode="width"
      :collapsed-width="64"
      :width="240"
      :collapsed="collapsed"
      show-trigger
      @collapse="collapsed = true"
      @expand="collapsed = false"
    >
      <n-menu
        :collapsed="collapsed"
        :collapsed-width="64"
        :collapsed-icon-size="22"
        :options="menuOptions"
        key-field="whateverKey"
        label-field="whateverLabel"
        children-field="whateverChildren"
      />
    </n-layout-sider>
    <n-layout />
  </n-layout>
</template>

<script lang="ts" setup>
import { useBaseStore } from '@/stores/modules/base'

const { setting } = useBaseStore()
const collapsed = setting?.sidebar
const menuOptions: MenuOption[] = [
  {
    whateverLabel: '且听风吟',
    whateverKey: 'hear-the-wind-sing'
  }
]
</script>

<style lang="scss"></style>
