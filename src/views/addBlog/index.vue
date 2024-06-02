<template>
  <div class="app-container">
    <div class="block">文章标题</div>
    <div style="margin-bottom: 15px;">
      <el-input v-model="form.title" placeholder="请输入文章标题"></el-input>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        title: "",
      },
    };
  },
  methods: {
    addBlog() {
      console.log(this.form);
    },
  },
}
</script>

<style lang="scss" scoped>
.block{
  margin-top: 15px;
  margin-bottom: 15px;
}
</style>
