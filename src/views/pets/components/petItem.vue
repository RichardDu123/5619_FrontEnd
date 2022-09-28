<template>
  <div class="pet-list">
    <div class="pet-item">
      <van-swipe-cell>
        <van-card
          class="pet-card"
          :desc="data.petDescription"
          :title="data.petName"
          :thumb="`data:image/png;base64,${data.petImageAddress}`"
          centered="centered"
        >
          <template #tags>
            <van-tag plain type="danger">{{ data.category }}</van-tag>
          </template>
        </van-card>
        <!--        <van-card :border="false" :value="name" />-->
        <template #right>
          <van-button
            square
            text="Delete"
            type="danger"
            class="delete-button"
            @click="handleDelete"
          />
        </template>
      </van-swipe-cell>
    </div>
  </div>
</template>

<script setup lang="ts">
import 'vant/es/dialog/style'
import { Pet } from '@/types'
import { Dialog } from 'vant'

defineProps({
  data: {
    type: Object as () => Pet,
  },
})

const handleDelete = () => {
  Dialog.confirm({
    title: 'Are you sure to delete this pet?',
    message: 'Click OK to delete this pet',
    confirmButtonText: 'Yes',
    cancelButtonText: 'No',
  })
    .then(() => {
      // on confirm
    })
    .catch(() => {
      // on cancel
    })
}
</script>

<style scoped lang="less">
.pet-card {
  margin: 0;
  background-color: white;
  text-align: center;
  :deep(.van-card__title) {
    font-size: 18px;
    font-family: 'Gill Sans', sans-serif;
    margin: 5px;
  }
}

.delete-button {
  height: 100%;
}
</style>
