<template>
  <div class="home">
    <van-button @click="sendReq()">send</van-button>
    <Test />
  </div>
</template>

<script setup lang="ts">
import { getUserInfo } from '@/api/user';
import Test from './test.vue';
const params = {
  id: 123
}
const sendReq = () => {
  getUserInfo(params).then(value => {
  })
}
</script>

<style lang="less" scoped>
</style>
