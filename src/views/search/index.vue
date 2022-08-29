<template>
  <div>
    <van-search ref="target" v-model="searchVal" placeholder="Search by title">
      <template #left>
        <van-icon name="arrow-left" @click="backFn" />
      </template>
    </van-search>
    <div>seachpage</div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { SearchInstance } from 'vant/lib/search'

const searchVal = ref('')
//back to homepage
const router = useRouter()
const backFn = () => {
  router.back()
}
//autofocus
const target = ref<SearchInstance>()
onMounted(() => {
  target.value?.focus()
})
</script>

<style scoped lang="less"></style>
