<template>
  <div class="myContainer">
    <van-nav-bar title="My Profile" class="myNav" fixed />
    <BasicInfo type="my" />
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
</template>

<script setup lang="ts">
import PostItem from '@/components/postItem.vue'
import { getPosts } from '@/api/post'
import { ref } from 'vue'
import { Post } from '@/types'
import BasicInfo from '@views/my/components/basicInfo.vue'
const postList = ref<Array<Post[]>>([])
const loading = ref(false)
const finished = ref(false)

const onLoad = () => {
  loading.value = true
  getPosts({}).then((value) => {
    for (let i = 0; i < value.data.length; i = i + 2) {
      if (i + 1 !== value.data.length) {
        postList.value.push([value.data[i], value.data[i + 1]])
      } else {
        postList.value.push([value.data[i], {}])
      }
    }
    loading.value = false
    if (postList.value.length === 18) {
      finished.value = true
    }
  })
}
</script>

<style lang="less" scoped>
.myContainer {
  padding-bottom: 50px;
  padding-top: 50px;
}
</style>
