<template>
  <div class="basicInfo">
    <div class="avatarLine">
      <van-image
        round
        :src="avatarUrl"
        class="avatar"
        fit="cover"
        @click="avatarClick"
      />
      <van-uploader
        accept="image/png, image/jpeg"
        v-model="fileList"
        ref="target"
        v-show="false"
      ></van-uploader>
      <van-button
        icon="edit"
        type="primary"
        round
        @click="handleClick"
        class="btn"
        >{{ status }}</van-button
      >
    </div>
    <div>
      <van-cell-group inset>
        <van-field
          v-model="description"
          rows="2"
          autosize
          type="textarea"
          maxlength="50"
          placeholder="Description of yourself"
          show-word-limit
          :disabled="disable"
        />
      </van-cell-group>
    </div>
    <div class="swipeBanner">
      <van-icon name="edit" class="edit" />
      <van-swipe vertical :autoplay="3000" lazy-render class="swipe">
        <van-swipe-item v-for="i in 4" :key="i"
          ><pet-item @click="toPetPage"
        /></van-swipe-item>
      </van-swipe>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onUnmounted, ref } from 'vue'
import PetItem from '@views/my/components/petItem.vue'
import { usePostStore } from '@/stores/post'
import { computed } from 'vue'
import router from '@/router'
// import { Pet } from '@/types'

defineProps({
  type: {
    type: String,
    required: true,
    default: 'my',
  },
})
//data
const postStore = usePostStore()
const disable = computed(() => !postStore.isDeleteShow)
const description = ref('I am a cat')
const defaultUrl = 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg'
// const pets = ref<Pet[]>([])
const toPetPage = () => {
  router.push('/pets')
}

//changeEdit
const status = computed(() => (postStore.isDeleteShow ? 'Save' : 'Edit'))
const handleClick = () => {
  if (status.value === 'Edit') {
    postStore.isDeleteShow = true
  } else {
    postStore.isDeleteShow = false
  }
}
//upload avatar
const target = ref<any>(null)
const fileList = ref<any>([])
const avatarClick = () => {
  if (status.value === 'Save') {
    target.value.chooseFile()
  }
}
const avatarUrl = computed(() => {
  return !fileList.value.length
    ? defaultUrl
    : fileList.value[fileList.value.length - 1].content
})
//Unmounted
onUnmounted(() => {
  postStore.isDeleteShow = false
})
</script>

<style scoped lang="less">
.basicInfo {
  margin: 30px 10px;
  .avatarLine {
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin-bottom: 20px;
    .avatar {
      width: 132px;
      height: 132px;
      margin-right: 20px;
      border: 2px solid white;
    }
    :deep(.van-button--round) {
      border-radius: 20px;
    }
    .btn {
      width: 100px;
    }
  }
  .swipeBanner {
    // margin-left: 18px;
    margin-top: 18px;
    padding: 0 15px;
    position: relative;
    .edit {
      position: absolute;
      top: 5px;
      right: 22px;
      font-size: 20px;
      z-index: 2;
      color: white;
    }
    .swipe {
      height: 150px;
    }
    .van-swipe-item {
      color: #fff;
      font-size: 20px;
      text-align: center;
      background-color: #39a9ed;
      border-radius: 15px;
      margin: auto;
    }
  }
}
</style>
