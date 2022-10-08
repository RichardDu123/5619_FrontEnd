<template>
  <van-list
    class="friend-list"
    v-model="loading"
    :finished="finished"
    finished-text="THE END"
    @load="onLoad"
  >
    <RequestItem
      v-for="(item, index) in requestList"
      :friendRequest="item"
      :key="index"
    />
  </van-list>
</template>

<script lang="ts">
import RequestItem from '@/views/friends/friendRequest/components/requestItem.vue'
import { defineComponent, ref } from 'vue'
import { GetFriendRequestList } from '@/api/friends'
import { User } from '@/types'

export default defineComponent({
  components: { RequestItem },
  setup() {
    const requestList = ref<User[]>([])
    const loading = ref(true)
    const finished = ref(false)
    const onLoad = () => {
      GetFriendRequestList({}).then((value) => {
        console.log('request list:', value)
        for (let i = 0; i < value.data.length; i++) {
          const request: User = {
            name: value.data[i].nickName,
            description: value.data[i].description,
            userAvatar: value.data[i].userAvatar,
          }
          requestList.value.push(request)
        }
        loading.value = false
        finished.value = true
      })
    }
    return {
      loading,
      finished,
      requestList,
      onLoad,
    }
  },
})
</script>
