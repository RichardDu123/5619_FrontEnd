<template>
  <div class="homeContainer">
    <van-search
      v-model="searchVal"
      placeholder="Search by title"
      @focus="onFocus"
    />
    <van-dropdown-menu class="dropDown">
      <van-dropdown-item
        v-model="option"
        :options="options"
        @change="onChange"
      />
    </van-dropdown-menu>
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
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Post } from '@/types'
import { getPosts } from '@/api/post'
import PostItem from '@/components/postItem.vue'
//search
const searchVal = ref('')
const router = useRouter()
const onFocus = () => {
  router.push('/search')
}
//dropdown menu
const option = ref(0)
const options = [
  { text: 'Sort by time', value: 0 },
  { text: 'Sort by likes', value: 1 },
]
const onChange = (value: number) => {
  console.log(value)
  postList.value = []
  onLoad()
}
//render posts
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
.homeContainer {
  .dropDown {
    :deep(.van-dropdown-menu__bar) {
      box-shadow: none;
    }
  }
}
</style>
