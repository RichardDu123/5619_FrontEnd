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
    <BasicInfo type="user" />
    <div>
      <van-list
        v-model:loading="loading"
        :finished="finished"
        finished-text="reach the end"
        @load="onLoad"
      >
        <PostItem v-for="(item, index) in postList" :key="index" :data="item" />
        <template #loading><van-loading color="#1989fa" /></template>
      </van-list>
    </div>
  </div>
</template>

<script setup lang="ts">
import BasicInfo from '@views/my/components/basicInfo.vue'
import PostItem from '@/components/postItem.vue'
import { Post } from '@/types'
import { reactive, ref } from 'vue'
import { getPosts } from '@/api/post'
import { useRouter } from 'vue-router'
const postList = ref<Array<Post[]>>([])
const loading = ref(false)
const finished = ref(false)
const page = reactive({
  currPage: 0,
  pageSize: 10,
})
let totalPosts = 0
const onLoad = () => {
  if (postList.value.length >= totalPosts) {
    finished.value = true
  }
  loading.value = true
  getPosts({ ...page }).then((value) => {
    for (let i = 0; i < value.data.length; i = i + 2) {
      if (i + 1 !== value.data.length) {
        postList.value.push([value.data[i], value.data[i + 1]])
      } else {
        postList.value.push([value.data[i], {}])
      }
    }
    loading.value = false
  })
}
const router = useRouter()
const onClickLeft = () => {
  router.back()
}
</script>

<style scoped lang="less"></style>
