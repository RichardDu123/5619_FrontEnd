<template>
  <div class="friend-list">
    <div class="friend-item">
      <van-swipe-cell>
        <van-cell :border="false" :value="name" />
        <template #right>
          <van-button
            square
            type="danger"
            text="Delete"
            @click="handleDelete"
          />
        </template>
      </van-swipe-cell>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Dialog } from 'vant'
import 'vant/es/dialog/style'

defineProps({
  name: {
    type: String,
    default: 'default',
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

<style scoped lang="less"></style>
