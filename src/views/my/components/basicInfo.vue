<template>
  <div class="basicInfo">
    <div class="avatarLine">
      <van-image round :src="avatarUrl" class="avatar" fit="cover" />
      <van-button icon="edit" type="primary" round>Eidt</van-button>
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
        <van-swipe-item>1</van-swipe-item>
        <van-swipe-item>2</van-swipe-item>
        <van-swipe-item>3</van-swipe-item>
        <van-swipe-item>4</van-swipe-item>
      </van-swipe>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
// import { Pet } from '@/types'

defineProps({
  type: {
    type: String,
    required: true,
    default: 'my',
  },
})
//data
const disable = ref<boolean>(true)
const description = ref('I am a cat')
const avatarUrl = ref('https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg')
// const pets = ref<Pet[]>([])
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
      line-height: 150px;
      text-align: center;
      background-color: #39a9ed;
      border-radius: 15px;
      margin: auto;
    }
  }
}
</style>
