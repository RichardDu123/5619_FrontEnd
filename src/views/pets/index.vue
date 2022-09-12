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
      finished-text="没有更多了"
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

<script>
import { GetPetList } from '../../api/pet'
import { ref } from 'vue'
import RelationItem from '@/components/relationItem.vue'

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

    return {
      petList,
      loading,
      finished,

      onLoad,
      RelationItem,
    }
  },
}
</script>

<style scoped lang="less">
.pet-list {
  padding: 20px;
}
</style>
