<template>
  <div class="search-page">
    <div class="search-page-header">
      <van-nav-bar left-arrow @click-left="onClickLeft" title="Search" />
      <van-search
        ref="target"
        v-model="searchVal"
        shape="round"
        show-action
        action-text="search"
        placeholder="Search by title"
      />
    </div>

    <van-cell class="trending-posts-header">
      <van-icon class="trending-posts-header-icon" name="chart-trending-o" />
      <span class="trending-posts-header-label">Trending</span>
    </van-cell>

    <div class="search-page-trending-posts">
      <TrendingList></TrendingList>
    </div>

    <van-divider :style="{ padding: '0 16px' }"> Advertisement </van-divider>

    <div @load="onLoadAdvertisement">
      <img class="search-page-ads-image" :src="adUrl" />
    </div>
  </div>
</template>

<script lang="ts">
import { useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'
import { SearchInstance } from 'vant'
import TrendingList from '@cp/trendingList.vue'
import { getAdvertisement } from '@/api/search'

export default {
  components: {
    TrendingList,
  },
  setup() {
    //back to homepage
    const router = useRouter()
    const onClickLeft = () => {
      router.back()
    }

    // autofocus
    const target = ref<SearchInstance>()
    onMounted(() => {
      target.value?.focus()
    })

    // load advertisement image
    const adUrl = ref('images/michael-sum-LEpfefQf4rU-unsplash.jpg')
    const onLoadAdvertisement = () => {
      getAdvertisement({})
        .then((value) => {
          console.log(value)
          const { data } = value
          adUrl.value = data.imgUrl
        })
        .catch((err) => {
          console.log(err)
        })
    }

    const searchVal = ref('')

    return {
      adUrl,
      target,
      searchVal,
      onClickLeft,
      onLoadAdvertisement,
    }
  },
}
</script>

<style scoped lang="less">
.search-page {
  overflow: hidden;
  .search-page-header {
    position: fixed;
    z-index: 1;
    width: 100%;
  }

  .trending-posts-header {
    margin-top: 30%;
    background-color: white;
    top: 0;
    .trending-posts-header-icon {
      color: red;
      margin: 1vw 2vw 1vw 1vw;
    }
    .trending-posts-header-label {
      color: red;
    }
  }

  .search-page-trending-posts {
    overflow: auto;
    height: 100vw;
  }

  .search-page-ads-image {
    width: 80%;
    height: auto;
    border-radius: 20px;
    border: 2px solid gold;
    object-fit: cover;
    display: block;
    margin-left: auto;
    margin-right: auto;
  }
}
</style>
