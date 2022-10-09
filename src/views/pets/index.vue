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
          :key="item.petId"
          @click="handlePet(String(item.petId))"
          :type="type"
          @update-table="updateTable"
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
      loading.value = true
      GetPetList({}).then((value) => {
        for (let i = 0; i < value.data.length; i++) {
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
    //update Tabel
    const updateTable = () => {
      finished.value = false
      petList.value = []
      onLoad()
    }
    return {
      PetItem,
      petList,
      loading,
      finished,
      type,
      onLoad,
      onClickLeft,
      handlePet,
      updateTable,
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
