<template>
  <div class="postList" v-if="data">
    <div
      class="postItem"
      :class="{ onlyOne: isOnlyOne }"
      @click="handleItemClick(data[0].postId)"
    >
      <van-image
        :src="`http://${data[0].imageUrlList[0]}`"
        fit="cover"
        class="img"
      >
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
        @click.stop="handleDelete"
        v-if="isDeleteShow"
      />
      <div class="foot">
        <div class="foot-title">
          {{ data[0].topic }}
        </div>
        <div class="rightFoot">
          <van-image
            round
            :src="`http://${
              avatar !== undefined ? avatar : data[0].userAvatar
            }`"
            class="avatar"
          />

        </div>
      </div>
    </div>
    <div
      class="postItem"
      v-if="data[1].postId"
      @click="handleItemClick(data[1].postId)"
    >
      <van-image
        :src="`http://${data[1].imageUrlList[0]}`"
        fit="cover"
        class="img"
      >
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
        v-if="isDeleteShow"
      />
      <div class="foot">
        <div class="foot-title">
          {{ data[1].topic }}
        </div>

        <div class="rightFoot">
          <van-image
            round
            :src="`http://${
              avatar !== undefined ? avatar : data[1].userAvatar
            }`"
            class="avatar"
          />

        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Post } from '@/types'
import { Dialog } from 'vant'
import 'vant/es/dialog/style'
import { computed } from 'vue'
import { usePostStore } from '@/stores/post'
import { useRouter } from 'vue-router'
import { deletePostById } from '@/api/post'
const props = defineProps({
  data: {
    type: Array<Post>,
    required: true,
  },
  avatar: {
    type: String,
  },
})
const emits = defineEmits(['updatePosts'])
const handleDelete = () => {
  Dialog.confirm({
    title: 'Are you sure to delete the post?',
    message: 'Click OK to delete the post',
    confirmButtonText: 'OK',
    cancelButtonText: 'Cancel',
  })
    .then(() => {
      // on confirm
      deletePostById(props.data[0].postId, {}).then(() => {
        emits('updatePosts')
      })
    })
    .catch(() => {
      // on cancel
    })
}
// listen to the edit actoin
const postStore = usePostStore()
const isDeleteShow = computed(() => {
  return postStore.isDeleteShow
})
//Only one post css
const isOnlyOne = !props.data[1].postId

//点击跳转
const router = useRouter()
const handleItemClick = (id: string) => {
  router.push({
    name: 'post',
    params: {
      postId: id,
    },
  })
}
</script>

<style scoped lang="less">
.postList {
  display: flex;
  justify-content: space-evenly;
  margin-bottom: 12px;
  .onlyOne {
    transform: translateX(-50%);
  }
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
      height: 80px;
      border-bottom-right-radius: 10px;
      border-bottom-left-radius: 10px;
      background-color: white;
      .foot-title {
        line-height: 30px;
        text-align: left;
        padding-left: 5px;
        font-size: 15px;
        .mixin-line-clamp(1);
      }
      .leftFoot {
      }
      .rightFoot {
        margin: auto;

        .avatar {
          //margin-top: 3px;
          //margin-right: 5px;
          width: 32px;
          height: 32px;
        }
      }
    }
  }
}
</style>
