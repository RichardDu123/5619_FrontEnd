<template>
  <div class="petContainer">
    <van-image
      class="petImg"
      src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
      fit="cover"
    />
    <div class="petInfo">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-Pets"></use>
      </svg>
      <span>asdasd</span>
      &nbsp;
      <svg class="icon petIcon" aria-hidden="true">
        <use xlink:href="#icon-ExoticPetVet"></use>
      </svg>
      <span>as</span>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="less">
.petContainer {
  position: relative;
  .petImg {
    width: 350px;
    height: 150px;
  }
  .petInfo {
    width: 250px;
    position: absolute;
    //background-color: rgba(0, 0, 0, 0.5);
    left: 50%;
    transform: translateX(-50%);
    border-radius: 10px;
    padding: 0 10px;
    bottom: 15px;
    line-height: unset;
    span {
      font-size: medium;
    }
  }
}
</style>
