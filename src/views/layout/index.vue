<template>
  <div>
    <router-view v-slot="{ Component }">
      <transition name="animation" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
    <van-tabbar v-model="currTag" class="tabBar">
      <van-tabbar-item name="home" @click="handlePush('home')" icon="home-o"
        >Home</van-tabbar-item
      >
      <van-tabbar-item name="my" @click="handlePush('my')" icon="user-o"
        >My</van-tabbar-item
      >
      <van-tabbar-item
        name="friends"
        @click="handlePush('friends')"
        icon="friends-o"
        >Friends</van-tabbar-item
      >
      <van-tabbar-item name="new" @click="handlePush('new')" icon="add-o"
        >New</van-tabbar-item
      >
    </van-tabbar>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { onBeforeRouteUpdate, useRoute, useRouter } from 'vue-router'
const route = useRoute()
const currTag = ref(route.name as string)
const router = useRouter()
const handlePush = (tag: string) => {
  currTag.value = tag
  router.push(tag)
}
onBeforeRouteUpdate((to) => {
  currTag.value = to.name as string
})
</script>

<style lang="less" scoped>
.tabBar {
  position: fixed;
}
.animation-enter-active,
.animation-leave-active {
  transition: all 0.5s ease;
}

.animation-enter-from,
.animation-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}

.animation-enter-to,
.animation-leave-from {
  transform: none;
  opacity: 1;
}
</style>
