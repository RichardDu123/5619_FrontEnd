<template>
  <div>
    <van-button round type="success" @click="jumpToRequestPage"
      >Friend Request
    </van-button>
  </div>
</template>

<script lang="ts">
import router from '../../router'

export default {
  setup() {
    const jumpToRequestPage = () => {
      router.push({
        name: 'friendRequest',
      })
    }
    return {
      jumpToRequestPage,
    }
  },
}
</script>

<style lang="less" scoped></style>
