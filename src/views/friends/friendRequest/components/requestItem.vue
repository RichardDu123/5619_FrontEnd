<template>
  <div class="friend-request-list">
    <div class="friend-request-item">
      <van-swipe-cell>
        <van-card
          class="request-card"
          :desc="data.requestText"
          :title="data.userName"
          :thumb="`${data.userAvatar}`"
          centered
        />
        <template #right>
          <van-button
            class="approve-button"
            square
            type="danger"
            text="Approve"
            @click="handleApprove"
          />
          <van-button
            class="deny-button"
            square
            type="primary"
            text="Deny"
            @click="handleDeny"
          />
        </template>
      </van-swipe-cell>
    </div>
  </div>
</template>

<script setup lang="ts">
import 'vant/es/dialog/style'
import { NewFriendRequest } from '@/types'
import { Dialog } from 'vant'
import { PostFriendRequestDecision } from '@/api/friends'

// const isApprove = ref(false)
const handleApprove = () => {
  // isApprove.value = true
  PostFriendRequestDecision({
    isApprove: true,
  }).then((value) => {
    console.log(value)
  })
}

defineProps({
  data: {
    type: Object as () => NewFriendRequest,
    required: true,
  },
})

const handleDeny = () => {
  Dialog.confirm({
    title: 'Are you sure to delete this friend request?',
    message: 'Click OK to delete this friend request',
    confirmButtonText: 'Yes',
    cancelButtonText: 'No',
  })
    .then(() => {
      // on confirm
      PostFriendRequestDecision({
        isApprove: false,
      }).then((value) => {
        console.log(value)
      })
    })
    .catch(() => {
      // on cancel
    })
}
</script>

<style scoped lang="less">
.request-card {
  margin: 0;
  background-color: white;
  text-align: center;
  :deep(.van-card__title) {
    font-size: 18px;
    font-family: 'Gill Sans', sans-serif;
    margin: 5px;
  }
}

.approve-button {
  height: 100%;
}
.deny-button {
  height: 100%;
}
</style>
