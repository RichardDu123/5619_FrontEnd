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
        <PetItem
          v-for="item in petList"
          :data="item"
          :key="item"
          @click="handlePet(item.petId)"
          :type="type"
        />
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
import { useRoute } from 'vue-router'

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
        for (let i = 0; i < value.data.length; i++) {
          // console.log('name:' + value.data[i].petName)
          // console.log('avatar:' + value.data[i].petImageAddress)
          const pet: Pet = {
            petName: value.data[i].petName,
            category: value.data[i].category,
            petImageAddress: value.data[i].petImageAddress,
            petDescription: value.data[i].petDescription,
            petId: value.data[i].petId,
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
    const handlePet = (id: string) => {
      router.push({
        name: 'pet',
        params: {
          petId: id,
        },
      })
    }
    //type
    const route = useRoute()
    const type = route.params.type as string

    return {
      PetItem,
      petList,
      loading,
      finished,
      type,
      onLoad,
      onClickLeft,
      handlePet,
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
