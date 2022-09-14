<template>
  <div>
    <router-view v-slot="{ Component }">
      <transition name="animation" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
    <van-tabbar route>
      <van-tabbar-item replace @click="$router.push('/home')" icon="home-o"
        >Home</van-tabbar-item
      >
      <van-tabbar-item replace @click="$router.push('/my')" icon="user-o"
        >My</van-tabbar-item
      >
      <van-tabbar-item
        replace
        @click="$router.push('/friends')"
        icon="friends-o"
        >Friends</van-tabbar-item
      >
      <van-tabbar-item replace @click="$router.push('/new')" icon="add-o"
        >New</van-tabbar-item
      >
    </van-tabbar>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="less" scoped>
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
