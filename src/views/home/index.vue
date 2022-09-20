<template>
  <div class="homeContainer">
    <van-search
      v-model="searchVal"
      placeholder="Search by title"
      @focus="onFocus"
      class="search"
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
      class="list"
    >
      <PostItem v-for="(item, index) in postList" :key="index" :data="item" />
      <template #loading><van-loading color="#1989fa" /></template>
    </van-list>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { Post } from '@/types'
import { getPosts } from '@/api/post'
import PostItem from '@/components/postItem.vue'

const searchVal = ref('')
const router = useRouter()
const onFocus = () => {
  router.push('/search')
}

//render posts
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
      totalPosts = value.data[i].totalPosts
    }
    loading.value = false
  })
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
  finished.value = false
  totalPosts = 0
}
</script>

<style lang="less" scoped>
.homeContainer {
  margin-bottom: 50px;
  overflow: hidden;

  .search {
    position: fixed;
    z-index: 1;
    width: 100%;
  }
  .dropDown {
    :deep(.van-dropdown-menu__bar) {
      box-shadow: none;
    }
    position: fixed;
    z-index: 1;
    width: 100%;
    top: 50px;
  }
  .list {
    margin-top: 100px;
    height: 83vh;
    overflow-y: auto;
  }
}
</style>
