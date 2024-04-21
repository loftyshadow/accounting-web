import { ref, computed } from 'vue'
import { Setting } from '@/types/base'
import { defineStore } from 'pinia'

export const useBaseStore = defineStore('base', () => {
  const setting = ref<Setting>()
  return { setting }
})
