<template>
  <div class="friend-list">
    <div class="friend-item">
      <van-swipe-cell>
        <van-card
          class="friend-card"
          :desc="data.description"
          :title="data.name"
          :thumb="`http://${data.userAvatar}`"
          centered
        />
        <!--        <van-card :border="false" :value="name" />-->
        <template #right>
          <van-button
            square
            text="Delete"
            type="danger"
            class="delete-button"
            @click="handleDelete"
          />
        </template>
      </van-swipe-cell>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Dialog } from 'vant'
import { User } from '@/types'
import 'vant/es/dialog/style'

defineProps({
  data: {
    type: Object as () => User,
    required: true,
  },
})

const handleDelete = () => {
  Dialog.confirm({
    title: 'Are you sure to delete this friend?',
    message: 'Click OK to delete this friend',
    confirmButtonText: 'Yes',
    cancelButtonText: 'No',
  })
    .then(() => {
      // on confirm
    })
    .catch(() => {
      // on cancel
    })
}
</script>

<style scoped lang="less">
.friend-card {
  margin: 0;
  background-color: white;
  text-align: center;
  :deep(.van-card__title) {
    font-size: 18px;
    font-family: 'Gill Sans', sans-serif;
    margin: 5px;
  }
}

.delete-button {
  height: 100%;
}
</style>
