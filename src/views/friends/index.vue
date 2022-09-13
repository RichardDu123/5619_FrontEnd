<template>
  <div class="friend-page">
    <van-nav-bar
      left-arrow
      @click-left="onClickLeft"
      title="Your Friends"
      class="myNav"
      fixed
    />
    <van-button
      class="request-button"
      round
      type="success"
      @click="jumpToRequestPage"
      >Friend Request
    </van-button>
    <van-list
      class="friend-list"
      v-model="loading"
      :finished="finished"
      finished-text="No more pets"
      @load="onLoad"
    >
      <FriendItem
        v-for="item in friendList"
        :name="item"
        :key="item"
        :title="item"
      />
    </van-list>
  </div>
</template>

<script lang="ts">
import router from '../../router'
import FriendItem from '@views/friends/friendList/components/friendItem.vue'
import { ref } from 'vue'
import { GetFriendList } from '@/api/friends'

export default {
  components: { FriendItem },

  setup() {
    const friendList = ref([])
    const loading = ref(false)
    const finished = ref(false)
    const jumpToRequestPage = () => {
      router.push({
        name: '/friendRequest',
      })
    }

    const onLoad = () => {
      GetFriendList({}).then((value) => {
        // console.log('value is:', value)
        for (let i = 0; i < value.data.length; i++) {
          friendList.value.push(value.data[i])
        }
        loading.value = false
        finished.value = true
      })
    }

    const onClickLeft = () => {
      router.back()
    }

    return {
      friendList,
      loading,
      finished,

      onLoad,
      jumpToRequestPage,
      onClickLeft,
    }
  },
}
</script>

<style lang="less" scoped>
.friend-page {
  .request-button {
    margin-top: 50px;
  }
}
</style>
