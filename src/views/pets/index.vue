<template>
  <div>
    <van-nav-bar
      left-arrow
      @click-left="onClickLeft"
      title="Your Pets"
      class="myNav"
      fixed
    />
    <van-list
      class="pet-list"
      v-model:loading="loading"
      :finished="finished"
      finished-text="No more pets"
      @load="onLoad"
    >
      <RelationItem
        v-for="item in petList"
        :name="item"
        :key="item"
        :title="item"
      />
    </van-list>
  </div>
</template>

<script lang="ts">
import { GetPetList } from '@/api/pet'
import { ref } from 'vue'
import RelationItem from '@/views/pets/components/relationItem.vue'
import router from '../../router'

export default {
  components: {
    RelationItem,
  },
  setup() {
    const loading = ref(false)
    const finished = ref(false)
    const petList = ref([])

    const onLoad = () => {
      GetPetList({}).then((value) => {
        // console.log('value is:', value)
        for (let i = 0; i < value.data.length; i++) {
          petList.value.push(value.data[i])
        }
        loading.value = false
        finished.value = true
      })
    }

    const onClickLeft = () => {
      router.back()
    }

    return {
      petList,
      loading,
      finished,

      onLoad,
      onClickLeft,

      RelationItem,
    }
  },
}
</script>

<style scoped lang="less">
.pet-list {
  margin-top: 50px;
  padding: 20px;
}
</style>
