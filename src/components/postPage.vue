<template>
  <div class="pageContainer">
    <van-nav-bar
      left-arrow
      :title="pageContet.topic"
      class="myNav"
      fixed
      @click-left="$router.back()"
    />
    <div class="avatarBanner">
      <van-image
        round
        fit="cover"
        :src="pageContet.userAvatar"
        class="avatar"
      />
      <span>{{
        pageContet.nickName === 'lazy to set name'
          ? pageContet.userName
          : pageContet.nickName
      }}</span>
    </div>
    <van-swipe :autoplay="3000" lazy-render class="imgSwipe">
      <van-swipe-item v-for="image in pageContet.imageUrlList" :key="image">
        <img :src="image" />
      </van-swipe-item>
    </van-swipe>
    <van-divider />
    <p class="content">
      {{ pageContet.content }}
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
        <p>{{ pageContet.love }}</p>
      </div>
    </div>
  </div>
</template>
)
<script setup lang="ts">
// :src="`data:image/png;base64,${data[0].imageUrlList[0]}`"
import { useRoute } from 'vue-router'
import { reactive, ref } from 'vue'
import CommentList from './commentList.vue'
import { getPostById } from '@/api/post'
const route = useRoute()
//render page
const pageContet = reactive({
  topic: '',
  userAvatar: '',
  nickName: '',
  userName: '',
  imageUrlList: [] as string[],
  content: '',
  commentList: [],
  love: 0,
  loved: false,
})
const postId = route.params.postId as string
getPostById(postId, {}).then((value) => {
  const { data } = value
  pageContet.topic = 'default'
  pageContet.userAvatar = `data:image/png;base64,${data.userAvatar}`
  pageContet.nickName = data.nickName
  pageContet.userName = data.userName
  data.imageUrlList.forEach((item: string[]) => {
    pageContet.imageUrlList.push(`data:image/png;base64,${item}`)
  })
  pageContet.content = data.postContent
})

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
    margin-left: 20px;
    display: flex;
    justify-self: start;
    align-items: center;
    .avatar {
      width: 60px;
      height: 60px;
      margin-right: 20px;
    }
  }
}
</style>
