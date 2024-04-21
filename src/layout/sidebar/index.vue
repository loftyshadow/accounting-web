<template>
  <SideBarItem></SideBarItem>
</template>

<script lang="ts" setup>
import SideBarItem from '../modules/sidebar-item/index.vue'
import { useBaseStore } from '@/stores/modules/base'

const { settings, allRoutes, sidebar } = toRefs(useBaseStore())
</script>

<style lang="sass"></style>
