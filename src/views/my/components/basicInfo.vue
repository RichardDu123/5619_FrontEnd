<template>
  <div class="basic-info-container">
    <div class="basic-info">
      <div class="profile-page-option-container" v-if="type === 'my'">
        <van-button
          hairline
          plain
          icon="exchange"
          type="primary"
          @click="handleLogoutClick"
          class="basic-info-logout-button"
          size="mini"
          >Log out</van-button
        >
        <van-button
          hairline
          plain
          icon="edit"
          type="primary"
          @click="handleEditClick"
          class="basic-info-edit-button"
          size="mini"
          >{{ status }}</van-button
        >
      </div>
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
        <div class="basic-info-display-info">
          <p class="basic-info-display-nickname">
            {{ nickName }}
          </p>
          <p class="basic-info-display-username">username: {{ userName }}</p>
        </div>
      </div>
      <div class="basic-info-description">
        <!--        <span class="basic-info-description-prefix">About me: </span>-->
        <span class="basic-info-description-content">{{ description }}</span>
      </div>

      <div class="user-page-add-friend-container" v-if="type === 'user'">
        <van-button
          hairline
          plain
          icon="plus"
          type="primary"
          @click="sendFriend"
          class="basic-info-send-button"
          size="small"
          >Friend</van-button
        >
      </div>
      <div class="change-info-container" v-if="status !== 'Edit'">
        <van-divider
          :style="{
            padding: '0 16px',
            color: 'white',
            borderColor: 'white',
          }"
        >
          Change your profile below
        </van-divider>
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
      </div>
    </div>
    <div class="pet-gallery-container">
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
      <div v-if="petList.length === 0 && type === 'user'">
        This guy is very lazy to add pets
      </div>

      <div class="swipeBanner" v-if="petList.length !== 0">
        <van-icon name="edit" class="edit" />
        <van-swipe vertical :autoplay="3000" lazy-render class="swipe">
          <van-swipe-item v-for="pet in petList" :key="pet"
            ><pet-item @click="toPetPage" :pet="pet"
          /></van-swipe-item>
        </van-swipe>
      </div>
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
import { useUserStore } from '@/stores'
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
const userName = ref('')
const defaultUrl = ref('')
const petList = ref([])
const route = useRoute()
if (props.type === 'my') {
  getProfile({}).then((value) => {
    const { data } = value
    defaultUrl.value = `${data.userImageAddress}`
    nickName.value = data.nickName
    userName.value = data.userName
    description.value = data.description
    petList.value = data.petList
  })
} else {
  getProfileById(route.params.userId as string, {}).then((value) => {
    const { data } = value
    defaultUrl.value = `${data.userImageAddress}`
    nickName.value = data.nickName
    userName.value = data.userName
    description.value = data.description
    petList.value = data.petList
  })
}
const router = useRouter()
const toPetPage = () => {
  if (props.type === 'my') {
    router.push({
      name: 'pets',
      params: {
        type: 'my',
      },
    })
  } else {
    router.push({
      name: 'pets',
      params: {
        type: 'user',
      },
    })
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
const handleEditClick = () => {
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
//logout
const userStore = useUserStore()
const handleLogoutClick = () => {
  userStore.$reset()
  router.push({
    name: 'login',
  })
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
.basic-info-container {
  //margin: 30px 10px;
  .basic-info {
    background-image: url('images/hans-ott-DH88eixP5GI-unsplash.jpg');
    padding-bottom: 10px;
  }

  .basic-info-options {
    margin-top: 15px;
    width: 100%;
    z-index: 1;
    position: fixed;
    background-color: white;
  }
  .profile-page-option-container {
    width: 100%;
    margin-top: 55px;
    display: inline-block;
    .basic-info-edit-button {
      color: black;
      float: right;
      margin-right: 5px;
    }
    .basic-info-logout-button {
      color: black;
      float: right;
      margin-right: 10px;
    }
  }
  .user-page-add-friend-container {
    width: 100%;
    margin-top: 5px;
    display: inline-block;
    .basic-info-send-button {
      color: crimson;
      float: right;
      margin-right: 10px;
    }
  }
  .avatarLine {
    display: flex;
    //align-items: center;
    //justify-content: space-around;
    margin: 0 10px 10px 20px;
    padding-top: 20px;
    .avatar {
      width: 120px;
      height: 120px;
      //margin-right: 20px;
      border: 2px solid white;
    }
    :deep(.van-button--round) {
      border-radius: 20px;
    }
    .basic-info-display-info {
      margin-top: auto;
      margin-bottom: auto;
      margin-left: 10px;
      font-family: 'Gill Sans', sans-serif;
      .basic-info-display-nickname {
        margin: 0;
        color: white;
        font-size: x-large;
        font-weight: bolder;
      }
      .basic-info-display-username {
        margin: 0;
        color: lightgray;
        font-size: medium;
      }
    }
  }
  .basic-info-description {
    //font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    color: white;
    font-size: medium;
    margin-left: 40px;
    margin-right: 40px;
    .basic-info-description-content {
      word-break: break-word;
    }

    //font-weight: lighter;
  }
  .pet-gallery-container {
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
