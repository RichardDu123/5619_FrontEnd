<template>
  <div>
    <van-nav-bar
      left-arrow
      @click-left="onClickLeft"
      title="Pet Page"
      class="myNav"
      fixed
    />
    <div class="petBasicInfo">
      <van-image round :src="petContent.petAvatar" class="avatar" fit="cover" />
      <div class="nameWrapper">
        <van-cell-group class="name" inset>
          <van-field v-model="petContent.petName" placeholder="Meow" readonly />
        </van-cell-group>
      </div>
    </div>
    <div class="addPet">
      <van-cell-group class="intro" inset>
        <van-field
          v-model="petContent.description"
          rows="4"
          autosize
          type="textarea"
          maxlength="100"
          placeholder="Add text"
          readonly
        />
      </van-cell-group>
    </div>
    <van-swipe :autoplay="3000" lazy-render class="imgSwipe">
      <van-swipe-item v-for="image in petContent.petImgList" :key="image">
        <img :src="image" @click="handlePreview" />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { reactive } from 'vue'
import { ImagePreview } from 'vant'
import 'vant/es/image-preview/style'
import { getPetById } from '@/api/pet'
export default {
  setup() {
    // route back
    const route = useRouter()
    const onClickLeft = () => {
      route.back()
    }
    const petContent = reactive({
      petAvatar: '',
      petName: '',
      description: '',
      petImgList: [],
    })
    const currRoute = useRoute()
    getPetById(currRoute.params.petId as string, {}).then((value) => {
      const { data } = value
      console.log(value)
      petContent.petAvatar = data.petImageAddress
      petContent.petName = data.petName
      petContent.description = data.petDescription
      petContent.petImgList = data.petImageList
    })
    const handlePreview = () => {
      ImagePreview(petContent.petImgList)
    }
    return {
      petContent,
      onClickLeft,
      handlePreview,
    }
  },
}
</script>

<style scoped lang="less">
.petBasicInfo {
  padding-top: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px 10px;
  .avatar {
    width: 110px;
    height: 110px;
    border: 2px solid white;
  }
  .name {
    width: 200px;
    height: 40px;
    vertical-align: middle;
  }
}

.addPet {
  margin: 20px 20px;
  .intro {
    margin: 0;
  }
}
.imgSwipe {
  margin-top: 20px;
  height: 200px;
  width: 100%;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
}
</style>
