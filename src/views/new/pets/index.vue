<template>
  <div>
    <van-nav-bar
      left-arrow
      @click-left="onClickLeft"
      title="Add Pet"
      class="myNav"
      fixed
    />
    <div class="petBasicInfo">
      <van-image
        round
        :src="avatarUrl"
        class="avatar"
        fit="cover"
        @click="triggerUpload"
      />
      <van-uploader v-show="false" :after-read="afterReadAvatar" ref="target" />
      <div class="nameWrapper">
        <van-cell-group class="name" inset>
          <van-field v-model="petName" placeholder="Meow" />
        </van-cell-group>
      </div>
    </div>
    <div class="addPet">
      <van-cell-group class="intro" inset>
        <van-field
          v-model="description"
          rows="4"
          autosize
          type="textarea"
          maxlength="100"
          placeholder="Add text"
          show-word-limit
        />
      </van-cell-group>
      <div class="add-pet-image">
        <van-uploader
          v-model="petImageList"
          multiple
          :max-count="6"
          class="img"
          :after-read-="afterReadPet"
        />
      </div>
      <div class="add-post-button">
        <van-button
          round
          color="linear-gradient(to right, #ff6034, #ee0a24)"
          class="postBtn"
          @click="onClickSubmitPost"
        >
          Add Post
        </van-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { submitPosts } from '@/api/post'

export default {
  setup() {
    // route back
    const route = useRouter()
    const onClickLeft = () => {
      route.back()
    }

    // add or change avatar
    const avatarUrl = ref(
      'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg'
    )
    const showUploader = ref(true)
    const afterReadAvatar = (file: any) => {
      avatarUrl.value = file.content
      console.log(file)
    }
    const target = ref()
    const triggerUpload = () => {
      // target.value.click()
      console.log('clear image buffer...')
      target.value.chooseFile()
    }

    // input or change pet name
    const petName = ref('')

    // input or change introduction
    const description = ref('')

    // input or change pet image
    const petImageList = ref([])
    const afterReadPet = (file: any) => {
      console.log(file)
    }

    // submit new pet
    const onClickSubmitPost = () => {
      submitPosts({
        petName: petName.value,
        petDescription: description.value,
        petImageAddress: petImageList.value,
      }).then((value) => {
        console.log(value)
      })
    }

    return {
      petName,
      showUploader,
      avatarUrl,
      target,
      petImageList,
      description,

      onClickLeft,
      afterReadAvatar,
      triggerUpload,
      afterReadPet,
      onClickSubmitPost,
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
    //margin-top: 1px;
    //padding-right: 10px;
    //padding-left: 10px;
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
  .add-pet-image {
    margin: 15px 2px 5px;
    display: flex;
    justify-content: space-evenly;

    .img {
      flex: 1;
      :deep(.van-uploader__upload) {
        width: 157px;
        height: 157px;
      }
      :deep(.van-uploader__preview-image) {
        width: 157px;
        height: 157px;
      }
      :deep(.van-uploader__preview) {
        margin: 4px;
      }
    }
  }
}
.add-post-button {
  padding-top: 30px;
  text-align: center;

  .postBtn {
    width: 300px;
  }
}
</style>
