<template>
  <div class="pageContainer">
    <van-nav-bar
      left-arrow
      :title="title"
      class="myNav"
      fixed
      @click-left="$router.back()"
    />
    <div class="avatarBanner">
      <van-image
        round
        fit="cover"
        src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
        class="avatar"
      />
      <span>name</span>
    </div>
    <van-swipe :autoplay="3000" lazy-render class="imgSwipe">
      <van-swipe-item v-for="image in images" :key="image">
        <img :src="image" />
      </van-swipe-item>
    </van-swipe>
    <van-divider />
    <p class="content">
      1231311111111111111111111111112313111111111111111111111111123131111111111111111111111111231311111111111111111111111112313111111111111111111111111123131111111111111111111111111231311111111111111111111111112313111111111111111111111111123131111111111111111111111111231311111111111111111111111112313111111111111111111111111123131111111111111111111111111231311111111111111111111111112313111111111111111111111111
    </p>
    <van-popup
      closeable
      v-model:show="show"
      round
      position="bottom"
      class="popup"
    >
      <template #default>
        <h3>comments</h3>
        <comment-list />
        <div class="newComment">
          <van-cell-group inset>
            <van-field
              v-model="message"
              rows="1"
              autosize
              label="Comment:"
              type="textarea"
              placeholder="Enter your comment"
            />
          </van-cell-group>
          <van-button type="primary" size="small">send</van-button>
        </div>
      </template>
    </van-popup>
    <div class="footer">
      <van-button
        type="primary"
        size="large"
        @click="show = true"
        round
        color="linear-gradient(to right, #4e9aec, #2b89ee)"
        class="btn"
        >大号按钮</van-button
      >
      <div>
        <van-icon name="like-o" />
        <p>123</p>
      </div>
    </div>
  </div>
</template>
)
<script setup lang="ts">
import { useRoute } from 'vue-router'
import { ref } from 'vue'
import CommentList from './commentList.vue'
import { getPostById } from '@/api/post'
const route = useRoute()
//render page
// const pageContet = reactive({
//   topic: '',
//   userAvatar: '',
// })
const postId = route.params.postId as string
getPostById(postId, {}).then((value) => console.log(value))

const title = route.params.postId as string
//swiper
const images = [
  'https://fastly.jsdelivr.net/npm/@vant/assets/apple-1.jpeg',
  'https://fastly.jsdelivr.net/npm/@vant/assets/apple-2.jpeg',
]
//comment
const show = ref(false)
const message = ref('')
</script>

<style scoped lang="less">
.pageContainer {
  padding-top: 50px;
  .footer {
    width: 100%;
    position: fixed;
    bottom: 0;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    .btn {
      width: 320px;
    }
    p {
      margin: 0;
    }
  }
  :deep(.van-button--large) {
    width: 80%;
  }
  :deep(.van-popup--bottom) {
    height: 500px;
  }
  h3 {
    text-align: center;
  }
  .btn {
    width: 200px;
    background: pink;
  }
  .newComment {
    margin-top: 20px;
    display: flex;
    align-items: center;
  }
  .content {
    margin: 20px 10px;
    min-height: 100px;
    word-wrap: break-word;
  }
  .imgSwipe {
    margin-top: 20px;
    height: 200px;
    width: 100%;
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
  .avatarBanner {
    margin-top: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    .avatar {
      width: 60px;
      height: 60px;
      margin-right: 20px;
    }
  }
}
</style>
