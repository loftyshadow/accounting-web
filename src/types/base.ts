import type { RouteRecordRaw, RouterOptions, RouterViewProps } from 'vue-router'

export type Setting = {
  sidebar?: boolean
}
interface rawConfig {
  hidden?: boolean
  alwaysShow?: boolean
  code?: number
  name?: string
  fullPath?: string
  path?: string
  meta?: {
    title: string
    icon?: string
    affix?: boolean
    activeMenu?: string
    breadcrumb?: boolean
    roles?: Array<string>
    elSvgIcon?: string
    code?: number
    cachePage?: boolean
    leaveRmCachePage?: boolean
    closeTabRmCache?: boolean
  }
  children?: RouterOptions
  redirect?: string
}

type RouterTypes = Array<RouterViewProps>
type RouteRawConfig = RouteRecordRaw & rawConfig
