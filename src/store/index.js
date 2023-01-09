import { createStore } from 'vuex'
import createPersistedstate from 'vuex-persistedstate'
import cart from './modules/cart.js'
import category from './modules/category'
import user from './modules/user.js'
export default createStore({
  modules: {
    cart,
    category,
    user
  },
  plugins: [
    createPersistedstate({
      key: 'erabbit-client-pc-store',
      paths: ['user', 'cart']
    })
  ]
})

// export default createStore({
//   state: {
//     // 数据
//     username: 'zs'
//   },
//   getters: {
//     // vuex的计算属性
//     newName(state) {
//       return state.username + '!!!'
//     }
//   },
//   mutations: {
//     // 该数据函数
//     updateName(state) {
//       state.username = 'ls'
//     }
//   },
//   actions: {
//     // 请求数据函数
//     updateName(ctx) {
//       setTimeout(() => {
//         ctx.commit('updateName')
//       }, 1000)
//     }
//   },
//   modules: {
//     // 分模块
//   }
// })
