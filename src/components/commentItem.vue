<template>
  <div class="commentItem">
    <van-image round fit="cover" :src="`${comment.avatar}`" class="avatar" />
    <div class="comment-content">
      <p style="color: gray">
        {{
          comment.nickName === 'lazy to set name'
            ? comment.userName
            : comment.nickName
        }}
      </p>
      <p>
        {{ comment.content }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ comment: any }>()
</script>

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
  .comment-content {
    //margin-right: 10px;
    width: 290px;
    word-wrap: break-word;
  }
}
</style>
