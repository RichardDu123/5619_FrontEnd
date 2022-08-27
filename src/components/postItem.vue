<template>
  <div class="postList" v-if="data">
    <div class="postItem">
      <van-image :src="data[0].postImgUrl" fit="cover" class="img">
        <template v-slot:loading>
          <van-loading type="spinner" size="20" />
        </template>
      </van-image>
      <van-button
        icon="delete-o"
        type="danger"
        size="mini"
        class="delete"
        color="linear-gradient(to right, #ff6034, #ee0a24)"
        @click="handleDelete"
      />
      <div class="foot">
        <div class="leftFoot">
          {{ data[0].postTitle }}
        </div>
        <div class="rightFoot">
          <van-image round :src="data[0].userImgUrl" class="avatar" />
        </div>
      </div>
    </div>
    <div class="postItem" v-if="data[1].postId">
      <van-image :src="data[1].postImgUrl" fit="cover" class="img">
        <template v-slot:loading>
          <van-loading type="spinner" size="20" />
        </template>
      </van-image>
      <van-button
        icon="delete-o"
        type="danger"
        size="mini"
        class="delete"
        color="linear-gradient(to right, #ff6034, #ee0a24)"
        @click="handleDelete"
      />
      <div class="foot">
        <div class="leftFoot">
          {{ data[1].postTitle }}
        </div>
        <div class="rightFoot">
          <van-image round :src="data[1].userImgUrl" class="avatar" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Post } from '@/types'
import { Dialog } from 'vant'
import 'vant/es/dialog/style'
defineProps({
  data: {
    type: Array<Post>,
  },
})
const handleDelete = () => {
  Dialog.confirm({
    title: 'Are you sure to delete the post?',
    message: 'Click OK to delete the post',
    confirmButtonText: 'OK',
    cancelButtonText: 'Cancel',
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
