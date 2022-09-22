<template>
  <div class="friend-request-page">
    <van-nav-bar
      left-arrow
      @click-left="onClickLeft"
      title="Your Friend Request"
      class="myNav"
      fixed
    />
    <div class="friend-request-list-container">
      <van-list
        class="friend-request-list"
        v-model="loading"
        :finished="finished"
        finished-text="No more requests"
        @load="onLoad"
      >
        <FriendRequest
          v-for="item in friendRequestList"
          :data="item"
          :key="item"
        />
      </van-list>
    </div>
  </div>
</template>

<script lang="ts">
import router from '../../../router'
import FriendRequest from '@views/friends/friendRequest/components/requestItem.vue'
import { ref } from 'vue'
import { GetFriendRequestList } from '@/api/friends'
import { NewFriendRequest } from '@/types'

export default {
  components: { FriendRequest },

  setup() {
    const friendRequestList = ref<NewFriendRequest[]>([])
    const loading = ref(false)
    const finished = ref(false)

    const onLoad = () => {
      GetFriendRequestList({}).then((value) => {
        console.log('value is:', value)
        for (let i = 0; i < value.data.length; i++) {
          const request: NewFriendRequest = {
            userName: value.data[i].userName,
            requestText: value.data[i].requestText,
            userAvatar: value.data[i].userAvatar,
          }
          friendRequestList.value.push(request)
        }
        loading.value = false
        finished.value = true
      })
    }

    const onClickLeft = () => {
      router.back()
    }

    return {
      friendRequestList,
      loading,
      finished,

      onLoad,
      onClickLeft,
    }
  },
}
</script>

<style lang="less" scoped>
.friend-request-page {
  margin-top: 60px;
  .friend-request-list-container {
    margin: 20px;
    .friend-request-list {
      margin: 10px;
    }
  }
}
</style>
