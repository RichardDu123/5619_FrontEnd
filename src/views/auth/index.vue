<template>
  <div class="loginContainer">
    <van-nav-bar title="Login Page" class="navBar" />
    <van-form @submit="onSubmit" class="loginForm">
      <van-cell-group inset>
        <van-field v-model="username" name="username" label="Username" placeholder="username"
          :rules="[{ validator: usernameValidator }]" left-icon="friends-o" />
        <van-field ref="fieldRef" v-model="password" :type="inputType" name="password" label="Password"
          placeholder="password" :rules="[{ validator: passwordValidator }]" left-icon="shield-o" :right-icon="iconShow"
          @click-right-icon="showPwd()" />
      </van-cell-group>
      <div style="margin: 16px;">
        <van-button round block type="primary" native-type="submit" :loading="isLoading" loading-type="spinner"
          class="loginBtn">
          login
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script lang="ts">
defineComponent
export default defineComponent({
  name: 'login',
})
</script>
<script setup lang="ts">
import { defineComponent, onBeforeUnmount, onUnmounted, ref } from 'vue';
import type { FieldType } from 'vant';

//handle submit
const username = ref<string>('')
const password = ref<string>('')
const isLoading = ref<boolean>(false)
const onSubmit = (): void => {
  isLoading.value = true
  const timer = setTimeout(() => {
    isLoading.value = false
  }, 2000)
}
//input validator
const usernameValidator = (username: string): string | boolean => {
  if (!/^[\da-zA-Z]{6,10}$/.test(username)) {
    return 'Username must contain 6-10 alphabetical and numeric characters!'
  } else {
    return true
  }
}
const passwordValidator = (password: string): string | boolean => {
  if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password)) {
    return 'Password must contain contain 8 characters, at least one letter and one number!'
  } else {
    return true
  }
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
  }
}

.loginForm {
  margin-top: 150px;

  .loginBtn {
    margin-top: 50px;
  }
}
</style>
