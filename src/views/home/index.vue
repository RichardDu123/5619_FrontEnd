<template>
  <div class="homeContainer">
    <van-search
      v-model="searchVal"
      placeholder="Search by title"
      @focus="onFocus"
    />
    <van-dropdown-menu class="dropDown">
      <van-dropdown-item v-model="option" :options="options" />
    </van-dropdown-menu>
    <div>homepage</div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
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
