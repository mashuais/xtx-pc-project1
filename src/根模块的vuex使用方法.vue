<template>
  <div>App根组件
    <!-- 1.使用根模块state的数据 -->
    <p>{{ $store.state.username }}</p>
    <!-- 2.使用跟模块getters的数据 -->
    <p>{{ $store.getters.newName }}</p>
    <button @click="mutationsFn">mutationsFn</button>
  </div>
</template>

<script>
import { useStore } from 'vuex'
export default {
  name: 'App',
  setup() {
    // 使用vuex仓库
    const store = useStore()
    console.log(store.state.username)
    console.log(store.getters.newName)
    const mutationsFn = () => {
      // 3 提交跟模块mutations函数
      // store.commit('updateName')
      // 4 调用根模块actions函数
      store.dispatch('updateName')
    }
    return { mutationsFn }
  }
}
</script>

<style>

</style>
