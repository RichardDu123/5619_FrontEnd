<template>
  <div>
    <van-search
      v-model="searchVal"
      placeholder="Search by title"
      @focus="onFocus"
    />
    <div>homepage</div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const searchVal = ref('')
const router = useRouter()
const onFocus = () => {
  router.push('/search')
}
</script>

<style lang="less" scoped></style>
