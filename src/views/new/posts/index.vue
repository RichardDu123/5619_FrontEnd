<template>
  <div>
    <van-uploader v-model="fileList" :after-read="afterRead" />
  </div>
</template>

<script lang="ts">
import { ref } from 'vue'

export default {
  setup() {
    const fileList = ref([
      // {
      //   url: 'https://fastly.jsdelivr.net/npm/@vant/assets/leaf.jpeg',
      //   status: 'uploading',
      //   message: 'Uploading...',
      // },
      // {
      //   url: 'https://fastly.jsdelivr.net/npm/@vant/assets/tree.jpeg',
      //   status: 'failed',
      //   message: 'Failed',
      // },
    ])

    const afterRead = (file: any) => {
      file.status = 'uploading'
      file.message = '上传中...'
      console.log(file)
      setTimeout(() => {
        console.log(file)
        file.status = 'failed'
        file.message = '上传失败'
      }, 1000)
    }

    return {
      fileList,
      afterRead,
    }
  },
}
</script>

<style scoped></style>
