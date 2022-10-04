<template>
  <div class="userContainer">
    <van-nav-bar
      title="User Profile"
      class="userNav"
      fixed
      placeholder
      left-arrow
      @click-left="onClickLeft"
    />
    <BasicInfo class="user-page-basic-info" type="user" />
    <van-divider :style="{ padding: '0 16px' }"> User's Posts </van-divider>
    <div>
      <van-list
        v-model:loading="loading"
        :finished="finished"
        finished-text="THE END"
        @load="onLoad"
      >
        <PostItem
          v-for="(item, index) in posts"
          :key="index"
          :data="item"
          :avatar="avatar"
        />
        <template #loading><van-loading color="#1989fa" /></template>
      </van-list>
    </div>
  </div>
</template>

<script setup lang="ts">
import BasicInfo from '@views/my/components/basicInfo.vue'
import PostItem from '@/components/postItem.vue'
import { Post } from '@/types'
import { ref } from 'vue'
import { getProfileById } from '@/api/post'
import { useRoute, useRouter } from 'vue-router'
const posts = ref<Array<Post[]>>([])
const loading = ref(false)
const finished = ref(false)
const route = useRoute()
const avatar = ref('')
const onLoad = () => {
  loading.value = true
  getProfileById(route.params.userId as string, {}).then((value) => {
    console.log(value)
    avatar.value = value.data.userImageAddress
    const {
      data: { postList },
    } = value
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
const router = useRouter()
const onClickLeft = () => {
  router.back()
}
</script>

<style scoped lang="less">
.user-page-basic-info {
}
</style>
