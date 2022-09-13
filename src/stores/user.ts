import { defineStore } from 'pinia'
interface user {
  uuid: null | string
  id: null | string
  userName: null | string
  userImageAddress: null | string
  nickName: null | string
}
export const useUserStore = defineStore('user', {
  state: () => ({
    userInfo: {
      uuid: null,
      id: null,
      userName: null,
      userImageAddress: null,
      nickName: null,
    } as user,
  }),
  // getters: {
  //   fullMessage: (state) => `The message is "${state.message}".`,
  // },
  actions: {
    // async updateMessage(newMessage: string): Promise<string> {
    //   return new Promise((resolve) => {
    //     setTimeout(() => {
    //       // 这里的 this 是当前的 Store 实例
    //       this.message = newMessage
    //       resolve('Async done.')
    //     }, 3000)
    //   })
    // },
    // 同步更新 message
    setUser(userInfo: user): void {
      // 这里的 this 是当前的 Store 实例
      this.userInfo = { ...userInfo }
    },
  },
  persist: {
    enabled: true,
    strategies: [
      {
        storage: localStorage,
      },
    ],
  },
})
