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
        v-if="type === 'my'"
      ></van-uploader>
      <van-button
        icon="edit"
        type="primary"
        round
        @click="handleClick"
        class="btn"
        v-if="type === 'my'"
        >{{ status }}</van-button
      >
      <van-button
        icon="plus"
        type="primary"
        round
        @click="sendFriend"
        class="btn"
        v-if="type === 'user'"
        >Friend</van-button
      >
    </div>
    <van-divider :style="{ padding: '0 16px' }"> Personal Info </van-divider>
    <div>
      <van-cell-group inset>
        <van-field
          v-model="nickName"
          label="Nick Name: "
          placeholder="Please enter nick name"
          :disabled="type === 'my' && disable"
          :readonly="type === 'user'"
        />
        <van-field
          v-model="description"
          rows="2"
          autosize
          type="textarea"
          maxlength="50"
          placeholder="Description of yourself"
          :disabled="type === 'my' && disable"
          :readonly="type === 'user'"
          :show-word-limit="type === 'my'"
        />
      </van-cell-group>
    </div>
    <van-divider :style="{ padding: '0 16px' }"> Pet Gallery </van-divider>
    <div
      class="add-first-pet"
      @click="toAddPetPage"
      v-if="petList.length === 0 && type === 'my'"
    >
      <van-row justify="center">
        <van-col><van-icon name="add-o" /></van-col>
        <van-col span="10">Add your first pet</van-col>
      </van-row>
    </div>

    <div class="swipeBanner" v-if="petList.length !== 0 && type === 'my'">
      <van-icon name="edit" class="edit" />
      <van-swipe vertical :autoplay="3000" lazy-render class="swipe">
        <van-swipe-item v-for="pet in petList" :key="pet"
          ><pet-item @click="toPetPage" :pet="pet"
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
import { getProfile, getProfileById } from '@/api/post'
import { useRoute, useRouter } from 'vue-router'
import { updateUserInfo } from '@/api/user'
import { Notify } from 'vant'
import 'vant/es/notify/style'
const props = defineProps({
  type: {
    type: String,
    required: true,
    default: 'my',
  },
})
//data
const postStore = usePostStore()
const disable = computed(() => !postStore.isDeleteShow)
const description = ref('')
const nickName = ref('')
const defaultUrl = ref('')
const petList = ref([])
const route = useRoute()
if (props.type === 'my') {
  getProfile({}).then((value) => {
    const { data } = value
    defaultUrl.value = `http://${data.userImageAddress}`
    nickName.value = data.nickName
    description.value = data.description
    petList.value = data.petList
  })
} else {
  getProfileById(route.params.userId as string, {}).then((value) => {
    const { data } = value
    defaultUrl.value = `http://${data.userImageAddress}`
    nickName.value = data.nickName
    description.value = data.description
    petList.value = data.petList
  })
}
const router = useRouter()
const toPetPage = () => {
  if (props.type === 'my') {
    router.push('/pets')
  }
}

const toAddPetPage = () => {
  if (props.type === 'my') {
    router.push('/addPet')
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
    ? defaultUrl.value
    : fileList.value[fileList.value.length - 1].content
})
//changeEdit
const status = computed(() => (postStore.isDeleteShow ? 'Save' : 'Edit'))
const handleClick = () => {
  if (status.value === 'Edit') {
    postStore.isDeleteShow = true
  } else {
    postStore.isDeleteShow = false
    updateUserInfo({
      userImageAddress: avatarUrl.value,
      nickName: nickName.value,
      description: description.value,
    }).then((value) => {
      if (value.message === 'Success') {
        Notify({ type: 'success', message: 'Successfully update.' })
      }
    })
  }
}

//Unmounted
onUnmounted(() => {
  postStore.isDeleteShow = false
})

//user profile
const sendFriend = () => {
  console.log('send friend')
}
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
  .add-first-pet {
    margin-top: 20px;
    text-align: center;
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
