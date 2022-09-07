<template>
  <div class="commentItem">
    <van-image
      round
      fit="cover"
      src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
      class="avatar"
    />
    <div class="text">
      <p>name</p>
      <p>
        My cat My catMy catMy catMy catMy catMy catMy catMy catMy catMy catMy
        cat My cat
      </p>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="less">
.commentItem {
  display: flex;
  justify-content: left;
  border-bottom: 1px solid #efefef;
  padding-top: 10px;
  .avatar {
    width: 50px;
    height: 50px;
    margin-right: 10px;
    flex-shrink: 0;
  }
}
</style>
