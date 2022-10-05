<template>
  <div class="pet-list">
    <div class="pet-item">
      <van-swipe-cell>
        <van-card
          class="pet-card"
          :desc="data.petDescription"
          :title="data.petName"
          :thumb="`${data.petImageAddress}`"
          centered
        >
          <template #tags>
            <van-tag plain type="danger">{{ data.category }}</van-tag>
          </template>
        </van-card>
        <!--        <van-card :border="false" :value="name" />-->
        <template #right v-if="type === 'my'">
          <van-button
            square
            text="Delete"
            type="danger"
            class="delete-button"
            @click="handleDelete(data.petId)"
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
import { deletePetById } from '@/api/pet'
defineProps({
  data: {
    type: Object as () => Pet,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
})
const emit = defineEmits(['updateTable'])
const handleDelete = (id: number) => {
  Dialog.confirm({
    title: 'Are you sure to delete this pet?',
    message: 'Click OK to delete this pet',
    confirmButtonText: 'Yes',
    cancelButtonText: 'No',
  })
    .then(() => {
      // on confirm
      deletePetById(id, {}).then(() => {
        emit('updateTable')
      })
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
