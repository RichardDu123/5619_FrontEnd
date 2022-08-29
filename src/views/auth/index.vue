<template>
  <div class="loginContainer">
    <van-nav-bar
      title="Login Page"
      class="navBar"
      left-arrow
      @click-left="onClickLeft"
    />
    <van-form @submit="onSubmit" class="loginForm">
      <van-cell-group inset>
        <van-field
          v-model="username"
          name="username"
          label="Username"
          placeholder="username"
          :rules="[{ validator: usernameValidator }]"
          left-icon="friends-o"
          autocomplete="off"
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
    <p class="forgot" @click="forgotShow = true">Forgot password?</p>
    <van-overlay :show="show">
      <sign-up @complete="show = false" />
    </van-overlay>
    <van-dialog
      v-model:show="forgotShow"
      title="Please enter email address"
      close-on-click-overlay
      show-cancel-button
      confirm-button-text="OK"
      cancel-button-text="Cancel"
      @closed="resetForm"
    >
      <van-form ref="targetForm">
        <van-cell-group inset>
          <van-field
            v-model="Email"
            name="Email"
            placeholder="Email"
            :rules="[{ validator: emailValidator }]"
            autocomplete="off"
          >
            <template #button>
              <van-button size="small" type="primary">Send code</van-button>
            </template>
          </van-field>
          <van-field v-model="code" placeholder="varification code" />
          <van-field
            v-model="newPassword"
            placeholder="password"
            :rules="[{ validator: passwordValidator }]"
            type="password"
          />
        </van-cell-group>
      </van-form>
    </van-dialog>
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
import {
  usernameValidator,
  passwordValidator,
  emailValidator,
} from '../../utils/validator'
import SignUp from './components/signUp.vue'
import { getUserInfo } from '@/api/user'
import { useRouter } from 'vue-router'
import { Dialog } from 'vant'
import 'vant/es/dialog/style'
import { FormInstance } from 'vant/lib/form'

const show = ref<boolean>(false)

//handle submit
const username = ref<string>('')
const password = ref<string>('')
const isLoading = ref<boolean>(false)
const onSubmit = (): void => {
  isLoading.value = true
  getUserInfo({
    userName: username.value,
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

//navbar click return back
const router = useRouter()
const onClickLeft = () => {
  router.back()
}
// forgot password
const VanDialog = Dialog.Component
const forgotShow = ref(false)
const Email = ref('')
const code = ref('')
const newPassword = ref('')
const targetForm = ref<FormInstance>()
const resetForm = () => {
  Email.value = ''
  code.value = ''
  newPassword.value = ''
  targetForm.value?.resetValidation()
}
</script>

<style scoped lang="less">
.forgot {
  color: @color-blue;
  text-decoration: underline;
  margin-left: 20px;
}
.navBar {
  background-color: @color-blue;
  :deep(.van-nav-bar__title) {
    color: @color-white;
    font-style: italic;
    font-size: 20px;
  }
}
:deep(.van-nav-bar .van-icon) {
  color: @color-white;
  font-size: large;
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
