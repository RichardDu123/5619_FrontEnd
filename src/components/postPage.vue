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
        @click="handlAvatarClick"
      />
      <span>{{
        pageContet.nickName === 'lazy to set name'
          ? pageContet.userName
          : pageContet.nickName
      }}</span>
    </div>
    <van-swipe :autoplay="3000" lazy-render class="imgSwipe">
      <van-swipe-item v-for="image in pageContet.imageUrlList" :key="image">
        <img :src="image" @click="handlePreview" />
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
        <comment-list :id="postId" ref="target" />
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
          <van-button type="primary" size="small" @click="postMessage"
            >send</van-button
          >
        </div>
      </template>
    </van-popup>
    <div class="footer">
      <van-button
        type="primary"
        size="large"
        round
        color="linear-gradient(to right, #4e9aec, #2b89ee)"
        class="btn"
        @click="clickComment"
        >Comments</van-button
      >
      <div>
        <van-icon :name="icon" @click="clickLove" />
        <p>{{ pageContet.love }}</p>
      </div>
    </div>
  </div>
</template>
)
<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { reactive, ref } from 'vue'
import CommentList from './commentList.vue'
import { getPostById, createLove, deleteLove, addComment } from '@/api/post'
import { ImagePreview } from 'vant'
import 'vant/es/image-preview/style'
import { computed } from 'vue'
import { Notify } from 'vant'
import 'vant/es/notify/style'
const route = useRoute()
//render page

const pageContet = reactive({
  postId: '',
  topic: '',
  userAvatar: '',
  nickName: '',
  userName: '',
  imageUrlList: [] as string[],
  content: '',
  commentList: [],
  love: 0,
  loved: false,
  userId: '',
})
const postId = route.params.postId as string
getPostById(postId, {}).then((value) => {
  const { data } = value
  pageContet.postId = data.postId
  pageContet.love = data.love
  pageContet.loved = data.loved
  pageContet.userId = data.userId
  pageContet.topic = 'default'
  pageContet.userAvatar = `http://${data.userAvatar}`
  pageContet.nickName = data.nickName
  pageContet.userName = data.userName
  data.imageUrlList.forEach((item: string[]) => {
    pageContet.imageUrlList.push(`http://${item}`)
  })
  pageContet.content = data.postContent
})
//comment
const show = ref(false)
const message = ref('')
const postMessage = () => {
  addComment(pageContet.postId, { commentContent: message.value }).then(
    (value) => {
      if (value.status === 200) {
        message.value = ''
        show.value = false
        Notify({ type: 'success', message: 'Success.' })
      }
    }
  )
}

//avatar click
const router = useRouter()
const handlAvatarClick = () => {
  router.push({
    name: 'user',
    params: {
      userId: pageContet.userId,
    },
  })
}
//preview images
const handlePreview = () => {
  ImagePreview(pageContet.imageUrlList)
}

//click love
const icon = computed(() => {
  return pageContet.loved ? 'like' : 'like-o'
})
const clickLove = async () => {
  if (!pageContet.loved) {
    await createLove(pageContet.postId, {})
    pageContet.loved = true
    pageContet.love++
  } else {
    await deleteLove(pageContet.postId, {})
    pageContet.loved = false
    pageContet.love--
  }
}
//comment
const target = ref<InstanceType<typeof CommentList> | null>(null)
const clickComment = () => {
  target.value?.onLoad()
  show.value = true
}
</script>

<style scoped lang="less">
.pageContainer {
  padding-top: 50px;
  .footer {
    margin-bottom: 20px;
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
    word-wrap: break-word;
    max-height: 330px;
    overflow-y: scroll;
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
