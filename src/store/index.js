import { createStore } from 'vuex'
// A模块
const moduleA = {
  state: {
    username: 'moduleA'
  }
}
// B模块
const moduleB = {
  namespaced: true,
  state: {
    username: 'moduleB'
  },
  getters: {
    changeName(state) {
      return state.username + 'BBB'
    }
  },
  mutations: {
    updateName(state) {
      state.username = state.username + 'bbbbb'
    }
  },
  actions: {
    updateName({ commit }) {
      setTimeout(() => {
        commit('updateName')
      }, 2000)
    }
  }
}
export default createStore({
  modules: {
    moduleA,
    moduleB
  }
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
