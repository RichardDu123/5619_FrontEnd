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
      <van-uploader
        v-model="fileList"
        multiple
        :max-count="6"
        class="img"
        accept="image/png, image/jpeg"
      />
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

    <van-divider></van-divider>

    <div class="tag-choice-container">
      <van-radio-group v-model="checked">
        <van-cell-group inset>
          <van-cell title="Cat" clickable @click="checked = 'cat'">
            <template #right-icon>
              <van-radio name="cat" />
            </template>
          </van-cell>
          <van-cell title="Dog" clickable @click="checked = 'dog'">
            <template #right-icon>
              <van-radio name="dog" />
            </template>
          </van-cell>
        </van-cell-group>
      </van-radio-group>
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
</template>

<script lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { submitPosts } from '@/api/post'
import { computed } from 'vue'
import { Notify } from 'vant'
import 'vant/es/notify/style'
export default {
  setup() {
    const fileList = ref([])
    const title = ref('')
    const description = ref('')
    // cat or dog
    const checked = ref('cat')

    const router = useRouter()
    const onClickLeft = () => {
      router.back()
    }
    const fileListArr = computed(() => {
      return fileList.value.map((item: any) => item.content)
    })
    const onClickSubmitPost = () => {
      submitPosts({
        postTopic: title.value,
        postContent: description.value,
        base64Data: fileListArr.value,
        tag: checked.value,
      }).then((value) => {
        console.log(value)
        Notify({ type: 'success', message: 'Successfully add post.' })
        router.back()
      })
    }

    return {
      title,
      description,
      fileList,
      checked,

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
