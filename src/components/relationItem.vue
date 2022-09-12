<template>
  <div class="relation-list">
    <div class="relation-item">
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
// import { Pet } from '@/types'
import { Dialog } from 'vant'
import 'vant/es/dialog/style'

// import { defineProps } from 'vue'

defineProps({
  name: {
    type: String,
    default: 'default',
  },
})

const handleDelete = () => {
  Dialog.confirm({
    title: 'Are you sure to delete this pet?',
    message: 'Click OK to delete this pet',
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
