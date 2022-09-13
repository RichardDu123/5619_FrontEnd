<template>
  <div>
    <van-nav-bar
      left-arrow
      @click-left="onClickLeft"
      title="Your Friend Request"
      class="myNav"
      fixed
    />
    <van-list
      class="friend-request"
      v-model="loading"
      :finished="finished"
      finished-text="No more requests"
      @load="onLoad"
    >
      <FriendRequest
        v-for="item in friendRequestList"
        :name="item"
        :key="item"
        :title="item"
      />
    </van-list>
  </div>
</template>

<script lang="ts">
import router from '../../../router'
import FriendRequest from '@views/friends/friendList/components/requestItem.vue'
import { ref } from 'vue'
import { GetFriendRequestList } from '@/api/friends'

export default {
  name: 'friendRequest',

  components: { FriendRequest },

  setup() {
    const friendRequestList = ref([])
    const loading = ref(false)
    const finished = ref(false)

    const onLoad = () => {
      GetFriendRequestList({}).then((value) => {
        // console.log('value is:', value)
        for (let i = 0; i < value.data.length; i++) {
          friendRequestList.value.push(value.data[i])
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

<style lang="less" scoped></style>
