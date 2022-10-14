<template>
  <div class="friend-page">
    <van-nav-bar title="Your Friends" class="myNav" fixed />
    <div class="friend-request-button-container">
      <van-button
        class="request-button"
        round
        type="success"
        @click="toRequestPage"
        >{{ reqNum }} Friend Requests
      </van-button>
    </div>
    <div class="friend-list-container">
      <FriendList></FriendList>
    </div>
  </div>
</template>

<script lang="ts">
import FriendList from '@views/friends/friendList/components/friendList.vue'
import { useRouter } from 'vue-router'
import { GetFriendRequestList } from '@/api/friends'
import { ref } from 'vue'
export default {
  components: { FriendList },

  setup() {
    const router = useRouter()
    const reqNum = ref(0)
    const toRequestPage = () => {
      router.push({
        name: 'friendRequest',
      })
    }
    GetFriendRequestList({}).then((value) => {
      console.log(value)
      reqNum.value = value.data.length
    })
    return {
      reqNum,
      toRequestPage,
    }
  },
}
</script>

<style lang="less" scoped>
.friend-page {
  width: 100%;
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
