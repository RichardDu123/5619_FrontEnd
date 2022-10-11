<template>
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
        :pet="item"
        :key="item.petId"
        :type="type"
        @update-table="updateTable"
      />
    </van-list>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import { Pet } from '@/types'
import { GetPetList } from '@/api/pet'
import { useRoute } from 'vue-router/dist/vue-router'
import PetItem from '@views/pets/petList/components/petItem.vue'
export default defineComponent({
  components: { PetItem },
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

    const route = useRoute()
    const type = route.params.type as string

    const updateTable = () => {
      finished.value = false
      petList.value = []
      onLoad()
    }

    return {
      type,
      petList,
      loading,
      finished,
      onLoad,
      updateTable,
    }
  },
})
</script>
