<template>
  <n-layout-sider
    collapse-mode="width"
    :collapsed-width="64"
    :width="240"
    :native-scrollbar="false"
    style="max-height: 320px"
  >
    <n-menu
      :collapsed="collapsed"
      :collapsed-width="64"
      :collapsed-icon-size="22"
      :options="menuOptions"
    />
  </n-layout-sider>
</template>

<script lang="ts" setup>
import { NIcon } from 'naive-ui'
import { RouterLink } from 'vue-router'
import {
  AlbumsOutline as StatisticsIcon,
  LibraryOutline as DetailIcon,
  HomeOutline as HomeIcon
} from '@vicons/ionicons5'

const collapsed = ref(false)

function renderIcon(icon: Component) {
  return () => h(NIcon, null, { default: () => h(icon) })
}
const menuOptions: MenuOption[] = [
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            path: '/detail'
          }
        },
        { default: () => '明细' }
      ),
    key: 'detail',
    icon: renderIcon(DetailIcon)
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            path: '/today'
          }
        },
        { default: () => '今日' }
      ),
    key: 'tody',
    icon: renderIcon(HomeIcon)
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            path: '/statistics'
          }
        },
        { default: () => '统计' }
      ),
    key: 'statistics',
    icon: renderIcon(StatisticsIcon)
  }
]
</script>

<style lang="scss">
.router-link-active {
  text-decoration: none;
  color: #fff;
}
a {
  text-decoration: none;
  color: #fff;
}
</style>
