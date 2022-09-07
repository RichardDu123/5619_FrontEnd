<template>
  <div class="listContainer">
    <van-list
      v-model:loading="loading"
      :finished="finished"
      finished-text="no more comments"
      @load="onLoad"
    >
      <CommentItem v-for="i in 4" :key="i" />
    </van-list>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import CommentItem from './commentItem.vue'

const list = ref<number[]>([])
const loading = ref(false)
const finished = ref(false)

const onLoad = () => {
  setTimeout(() => {
    for (let i = 0; i < 10; i++) {
      list.value.push(list.value.length + 1)
    }

    // 加载状态结束
    loading.value = false

    // 数据全部加载完成
    if (list.value.length >= 40) {
      finished.value = true
    }
  }, 1000)
}
</script>

<style scoped lang="less">
.listContainer {
  margin: 0px 10px;
  height: 350px;
  overflow-y: scroll;
}
</style>
