<template>
  <div class="friend-page">
    <van-nav-bar title="Your Friends" class="myNav" fixed />
    <div class="friend-request-button-container">
      <van-button
        class="request-button"
        round
        type="success"
        @click="toRequestPage"
        >Friend Request
      </van-button>
    </div>

    <div class="friend-list-container">
      <van-list
        class="friend-list"
        v-model="loading"
        :finished="finished"
        finished-text="No more results"
        @load="onLoad"
      >
        <FriendItem v-for="item in friendList" :data="item" :key="item" />
      </van-list>
    </div>
  </div>
</template>

<script lang="ts">
import router from '../../router'
import FriendItem from '@views/friends/friendList/components/friendItem.vue'
import { ref } from 'vue'
import { GetFriendList } from '@/api/friends'
import { User } from '@/types'

export default {
  components: { FriendItem },

  setup() {
    const friendList = ref<User[]>([])
    const loading = ref(false)
    const finished = ref(false)
    const toRequestPage = () => {
      router.push('/friendRequest')
    }

    const onLoad = () => {
      GetFriendList({}).then((value) => {
        for (let i = 0; i < value.data.length; i++) {
          const friend: User = {
            name: value.data[i].name,
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
      friendList,
      loading,
      finished,

      onLoad,
      toRequestPage,
    }
  },
}
</script>

<style lang="less" scoped>
.friend-page {
  .friend-request-button-container {
    justify-content: center;
    display: flex;
    .request-button {
      margin-top: 60px;
      width: 300px;
      background-color: coral;
      border: 1px solid coral;
    }
  }
  .friend-list-container {
    margin: 10px;
    .friend-list {
      margin: 10px;
    }
  }
}
</style>
