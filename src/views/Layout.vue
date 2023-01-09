<template>
  <!-- 顶部通栏 -->
  <app-topnav></app-topnav>
  <!-- 头部组件 -->
  <app-header></app-header>
  <app-header-sticky></app-header-sticky>
  <!-- 内容容器 -->
  <main class="app-body">
    <!-- 二级路由 -->
    <router-view></router-view>
  </main>
  <!-- 底部组件 -->
  <app-footer></app-footer>
</template>

<script>
import AppTopnav from '@/components/app-topnav.vue'
import AppHeader from '@/components/app-header.vue'
import AppFooter from '@/components/app-footer.vue'
import { useStore } from 'vuex'
import AppHeaderSticky from '@/components/app-header-sticky.vue'
export default {
  components: { AppTopnav, AppHeader, AppFooter, AppHeaderSticky },
  name: 'Layout',
  setup() {
    const store = useStore()
    store.dispatch('category/getList')
  }
}
</script>

<style scoped lang='less'>
.app-body {
  min-height: 600px;
}
</style>
