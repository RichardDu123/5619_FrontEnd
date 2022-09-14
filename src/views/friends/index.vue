<template>
  <div class="friend-page">
    <van-nav-bar
      left-arrow
      @click-left="onClickLeft"
      title="Your Friends"
      class="myNav"
      fixed
    />
    <div class="friend-request-button-container">
      <van-button
        class="request-button"
        round
        type="success"
        @click="jumpToRequestPage"
        >Friend Request
      </van-button>
    </div>

    <div class="friend-list-container">
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
      router.push('/friendRequest')
    }

    const onLoad = () => {
      GetFriendList({}).then((value) => {
        console.log('value is:', value)
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
  .friend-request-button-container {
    justify-content: center;
    display: flex;
    .request-button {
      margin-top: 60px;
      width: 300px;
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
