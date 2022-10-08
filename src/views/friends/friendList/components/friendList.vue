<template>
  <van-list
    class="friend-list"
    v-model="loading"
    :finished="finished"
    finished-text="THE END"
    @load="onLoad"
  >
    <FriendItem
      v-for="(item, index) in friendList"
      :friend="item"
      :key="index"
    />
  </van-list>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { GetFriendList } from '@/api/friends'
import { User } from '@/types'
import FriendItem from '@views/friends/friendList/components/friendItem.vue'

export default defineComponent({
  components: {
    FriendItem,
  },
  setup() {
    const friendList = ref<User[]>([])
    const finished = ref<boolean>(false)
    const loading = ref<boolean>(true)
    const onLoad = () => {
      GetFriendList({}).then((value) => {
        for (let i = 0; i < value.data.length; i++) {
          const friend: User = {
            name: value.data[i].nickName,
            description: value.data[i].description,
            userAvatar: value.data[i].userAvatar,
          }
          friendList.value.push(friend)
        }
        loading.value = false
        finished.value = true
      })
    }
    return {
      finished,
      loading,
      friendList,
      onLoad,
    }
  },
})
</script>

<style scoped lang="less"></style>
