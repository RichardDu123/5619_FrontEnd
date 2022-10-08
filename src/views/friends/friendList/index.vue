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
      <FriendList></FriendList>
    </div>
  </div>
</template>

<script lang="ts">
import router from '@/router'
import FriendList from '@views/friends/friendList/components/friendList.vue'

export default {
  components: { FriendList },

  setup() {
    const toRequestPage = () => {
      router.push('/friendRequest')
    }

    return {
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
