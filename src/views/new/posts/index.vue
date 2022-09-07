<template>
  <div class="addPost">
    <van-nav-bar
      left-arrow
      @click-left="onClickLeft"
      title="Add Post"
      class="myNav"
      fixed
    />
    <div class="add-post-upload-image">
      <van-uploader v-model="fileList" multiple :max-count="6" class="img" />
    </div>
    <van-cell-group inset>
      <van-field v-model="title" placeholder="Add Title" />
    </van-cell-group>
    <van-divider></van-divider>

    <van-cell-group inset>
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
</template>

<script lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { submitPosts } from '@/api/post'

export default {
  setup() {
    const fileList = ref([])
    const title = ref('')
    const description = ref('')
    const afterRead = (file: any) => {
      // 此时可以自行将文件上传至服务器
      console.log(file)
    }
    const router = useRouter()
    const onClickLeft = () => {
      router.back()
    }

    const onClickSubmitPost = () => {
      submitPosts({
        title: title.value,
        postContent: description.value,
        base64Data: fileList.value,
      }).then((value) => {
        console.log(value)
      })
    }

    return {
      title,
      description,
      fileList,
      afterRead,
      onClickLeft,
      onClickSubmitPost,
    }
  },
}
</script>

<style scoped lang="less">
.addPost {
  padding-top: 50px;

  .add-post-upload-image {
    margin-top: 15px;
    margin-left: 15px;
    margin-bottom: 5px;
    display: flex;
    justify-content: space-evenly;

    .img {
      flex: 1;
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
