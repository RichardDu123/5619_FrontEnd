<template>
  <div class="loginContainer">
    <van-nav-bar title="Login Page" class="navBar" />
    <van-form @submit="onSubmit" class="loginForm">
      <van-cell-group inset>
        <van-field
          v-model="username"
          name="username"
          label="Username"
          placeholder="username"
          :rules="[{ validator: usernameValidator }]"
          left-icon="friends-o"
        />
        <van-field
          ref="fieldRef"
          v-model="password"
          :type="inputType"
          name="password"
          label="Password"
          placeholder="password"
          :rules="[{ validator: passwordValidator }]"
          left-icon="shield-o"
          :right-icon="iconShow"
          @click-right-icon="showPwd()"
        />
      </van-cell-group>
      <br />
      <div style="margin: 16px">
        <van-button @click="show = true" round type="default" class="signUpBtn"
          >Sign up
        </van-button>
        <van-button
          round
          block
          type="primary"
          native-type="submit"
          :loading="isLoading"
          loading-type="spinner"
          class="loginBtn"
        >
          Sign in
        </van-button>
      </div>
    </van-form>
    <van-overlay :show="show">
      <sign-up @complete="show = false" />
    </van-overlay>
  </div>
</template>

<script lang="ts">
defineComponent
export default defineComponent({
  name: 'login',
})
</script>
<script setup lang="ts">
import { defineComponent, ref } from 'vue'
import type { FieldType } from 'vant'
import { usernameValidator, passwordValidator } from '../../utils/validator'
import SignUp from './components/signUp.vue'
import { getUserInfo } from '@/api/user'

const show = ref<boolean>(false)

//handle submit
const username = ref<string>('')
const password = ref<string>('')
const isLoading = ref<boolean>(false)
const onSubmit = (): void => {
  isLoading.value = true
  getUserInfo({
    username: username.value,
    password: password.value,
  }).then((value) => {
    console.log(value)
    isLoading.value = false
  })
}

//show password or not
const iconShow = ref<string>('closed-eye')
const inputType = ref<FieldType>('password')
const showPwd = (): void => {
  if (iconShow.value === 'closed-eye') {
    iconShow.value = 'eye-o'
    inputType.value = 'text'
  } else {
    iconShow.value = 'closed-eye'
    inputType.value = 'password'
  }
}
</script>

<style scoped lang="less">
.navBar {
  background-color: @color-blue;

  :deep(.van-nav-bar__title) {
    color: @color-white;
    font-style: italic;
    font-size: 20px;
  }
}

.loginForm {
  margin-top: 100px;
  .signUpBtn {
    :deep(.van-button__text) {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      font-size: 20px;
    }
    margin-left: 50px;
    width: 250px;
    height: 40px;
    margin-bottom: 20px;
    border-color: black;
  }
  .loginBtn {
    :deep(.van-button__text) {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      font-size: 20px;
    }
    width: 250px;
    height: 40px;
    margin-left: 50px;
  }
}
</style>
