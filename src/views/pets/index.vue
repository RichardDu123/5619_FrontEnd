<template>
  <div class="pet-page">
    <van-nav-bar
      left-arrow
      @click-left="onClickLeft"
      title="Your Pets"
      class="myNav"
      fixed
    />
    <div class="pet-list-container">
      <van-list
        class="pet-list"
        v-model:loading="loading"
        :finished="finished"
        finished-text="No more pets"
        @load="onLoad"
      >
        <PetItem v-for="item in petList" :data="item" :key="item" />
      </van-list>
    </div>
  </div>
</template>

<script lang="ts">
import { GetPetList } from '@/api/pet'
import { ref } from 'vue'
import PetItem from '@views/pets/components/petItem.vue'
import router from '../../router'
import { Pet } from '@/types'

export default {
  components: {
    PetItem,
  },
  setup() {
    const loading = ref(false)
    const finished = ref(false)
    const petList = ref<Pet[]>([])

    const onLoad = () => {
      GetPetList({}).then((value) => {
        console.log('value is:', value)
        for (let i = 0; i < value.data.length; i++) {
          // console.log('name:' + value.data[i].petName)
          // console.log('avatar:' + value.data[i].petImageAddress)
          const pet: Pet = {
            petName: value.data[i].petName,
            category: value.data[i].category,
            petImageAddress: value.data[i].petImageAddress,
            petDescription: value.data[i].petDescription,
          }
          petList.value.push(pet)
        }
        loading.value = false
        finished.value = true
      })
    }

    const onClickLeft = () => {
      router.back()
    }

    return {
      PetItem,
      petList,
      loading,
      finished,
      onLoad,
      onClickLeft,
    }
  },
}
</script>

<style scoped lang="less">
.pet-page {
  .pet-list-container {
    margin-top: 60px;
    .pet-list {
      margin: 10px;
    }
  }
}
</style>
