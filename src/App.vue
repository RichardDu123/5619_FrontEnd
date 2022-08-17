<template>
  <router-view v-slot="{ Component }">
    <transition :name="aniName" mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { watch, ref } from 'vue'

//only login page has animation
const route = useRoute();
const aniName = ref<string>('')
watch(route, (to, from) => {
  if (to.path === '/login') {
    aniName.value = 'ani'
  } else {
    aniName.value = ''
  }
})

</script>
<style scoped lang="less">
.ani-enter-active,
.ani-leave-active {
  transition: all 0.5s ease-out;
}

.ani-enter-from,
.ani-leave-to {
  transform: translateY(-100%);
  opacity: 0;
}

.ani-enter-to,
.ani-leave-from {
  transform: none;
  opacity: 1;
}
</style>
