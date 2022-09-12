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
    message: 'Click OK to delete the post',
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
.postList {
  display: flex;
  justify-content: space-evenly;
  margin-bottom: 12px;
  .postItem {
    width: 180px;
    position: relative;
    .delete {
      position: absolute;
      top: 8px;
      right: 8px;
    }
    .img {
      display: block;
      width: 180px;
      height: 135px;
      :deep(.van-image__img) {
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
      }
    }
    .foot {
      height: 38px;
      display: flex;
      border-bottom-right-radius: 10px;
      border-bottom-left-radius: 10px;
      background-color: white;
      .leftFoot {
        padding-left: 5px;
        font-size: 15px;
        .mixin-line-clamp(2);
      }
      .rightFoot {
        .avatar {
          margin-top: 3px;
          margin-right: 5px;
          width: 32px;
          height: 32px;
        }
      }
    }
  }
}
</style>
