<template>
  <div class="signup" ref="target">
    <div class="signUpBox">
      <van-form @submit="onSubmit" class="sigUpForm" ref="form">
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
            v-model="password"
            type="password"
            name="password"
            label="Password"
            placeholder="password"
            :rules="[{ validator: passwordValidator }]"
            left-icon="shield-o"
          />
          <van-field
            v-model="repassword"
            type="password"
            name="repassword"
            label=""
            placeholder="Confirm Password"
            :rules="[{ validator: repasswordValidator }]"
            left-icon="shield-o"
          />
        </van-cell-group>
        <div style="margin: 16px">
          <van-button
            round
            block
            type="primary"
            class="submitBtn"
            native-type="submit"
            :loading="isLoading"
            @click="signup"
          >
            Sign Up
          </van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { usernameValidator, passwordValidator } from '@/utils/validator'
import { ref } from 'vue'
import { onClickOutside } from '@vueuse/core'
import { FormInstance } from 'vant'
import { signUp } from '@/api/user'

const username = ref('')
const password = ref('')
const repassword = ref('')
const repasswordValidator = (pwd: string): string | boolean => {
  if (pwd !== password.value) {
    return 'Please confirm your password!'
  } else {
    return true
  }
}

//handle signUp
const isLoading = ref<boolean>(false)
const onSubmit = (): void => {
  isLoading.value = true
  setTimeout(() => {
    isLoading.value = false
  }, 2000)
}

//handle clickoutside to close the layout
const target = ref(null)
const emit = defineEmits(['complete'])
const form = ref<FormInstance | null>(null)
onClickOutside(target, () => {
  if (form.value) {
    form.value.resetValidation()
    username.value = ''
    password.value = ''
    repassword.value = ''
  }
  emit('complete')
})

const signup = () => {
  signUp({
    userName: username.value,
    password: password.value,
  }).then((value) => console.log(value))
}
</script>

<style lang="less" scoped>
.signup {
  width: 300px;
  border-radius: 40px;
  background-color: whitesmoke;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.signUpBox {
  margin-top: 130px;
}
.submitBtn {
  margin-top: 50px;
  .signUpForm {
    margin-top: 30px;
    margin-bottom: 30px;
  }
}
</style>
