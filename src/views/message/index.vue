<template>
  <div class="message-container">
    <el-input v-model="input" placeholder="请输入内容"></el-input>
  </div>
</template>

<script>
export default {
  name: 'Message',
  data() {
    return {
      input: ''
    }
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>

