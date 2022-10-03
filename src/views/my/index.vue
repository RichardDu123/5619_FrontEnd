<template>
  <div class="myContainer">
    <van-nav-bar title="My Profile" class="myNav" fixed />
    <van-icon name="exchange" class="logout" @click="logout" />
    <BasicInfo type="my" />
    <van-divider :style="{ padding: '0 16px' }"> My Posts </van-divider>
    <div class="add-first-post" @click="toAddPostPage" @load="onLoad">
      <van-row justify="center" v-if="posts.length === 0">
        <van-col><van-icon name="add-o" /></van-col>
        <van-col span="10">Add your first post</van-col>
      </van-row>
    </div>
    <div>
      <van-list
        v-model:loading="loading"
        :finished="finished"
        finished-text="reach the end"
        @load="onLoad"
      >
        <div v-if="posts.length !== 0">
          <PostItem
            v-for="(item, index) in posts"
            :key="index"
            :data="item"
            :avatar="avatarUrl"
            @update-posts="updatePosts"
          />
        </div>
        <template #loading><van-loading color="#1989fa" /></template>
      </van-list>
    </div>
  </div>
</template>

<script setup lang="ts">
import PostItem from '@/components/postItem.vue'
import { getProfile } from '@/api/post'
import { ref } from 'vue'
import { Post } from '@/types'
import BasicInfo from '@views/my/components/basicInfo.vue'
import { useUserStore } from '@/stores'
import { useRouter } from 'vue-router'
const posts = ref<Array<Post[]>>([])
const loading = ref(false)
const finished = ref(false)
const avatarUrl = ref('')
getProfile({}).then((value) => {
  avatarUrl.value = value.data.userImageAddress
})
const onLoad = () => {
  posts.value = []
  loading.value = true
  console.log('profile on load')
  getProfile({}).then((value) => {
    const {
      data: { postList },
    } = value
    console.log('post length:', value.date.length)
    for (let i = 0; i < postList.length; i = i + 2) {
      if (i + 1 !== postList.length) {
        posts.value.push([postList[i], postList[i + 1]])
      } else {
        posts.value.push([postList[i], {}])
      }
    }
    loading.value = false
    finished.value = true
  })
}
//logout
const userStore = useUserStore()
const router = useRouter()
const logout = () => {
  userStore.$reset()
  router.push({
    name: 'login',
  })
}

//updatePosts
const updatePosts = () => {
  onLoad()
}

const toAddPostPage = () => {
  router.push('/addPost')
}
</script>

<style lang="less" scoped>
.myContainer {
  position: relative;
  .add-first-post {
    text-align: center;
  }
  .logout {
    font-size: 32px;
    top: 60px;
    right: 20px;
    position: absolute;
  }
  padding-bottom: 50px;
  padding-top: 50px;
}
</style>
