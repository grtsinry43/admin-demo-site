<template>
  <div class="app-container">
    <el-form :model="form">
      <el-form-item label="项目名称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="项目描述（用英文逗号分割）">
        <el-input v-model="form.description"></el-input>
      </el-form-item>
      <el-form-item label="项目地址">
        <el-input v-model="form.url"></el-input>
      </el-form-item>
      <el-form-item label="github地址">
        <el-input v-model="form.github"></el-input>
      </el-form-item>
      <el-form-item>
        <Upload upload-title="请选择项目预览图" v-model="form.thumb"/>
      </el-form-item>
      <el-form-item label="排序">
        <el-select v-model="form.order" placeholder="请选择排序等级">
          <el-option label="1" value="1"></el-option>
          <el-option label="2" value="2"></el-option>
          <el-option label="3" value="3"></el-option>
          <el-option label="4" value="4"></el-option>
          <el-option label="5" value="5"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addProjectHandle">发布项目</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Upload from "@/components/Upload.vue";
import {addProject} from "@/api/project";

export default {
  components: {
    Upload
  },
  data() {
    return {
      form: {
        name: "",
        description: "",
        url: "",
        github: "",
        thumb: "",
        order: ""
      }
    }
  },
  methods: {
    addProjectHandle() {
      addProject({
        ...this.form,
        description: this.form.description.split(","),
        order: parseInt(this.form.order)
      }).then(res => {
        if (res.code === 0) {
          this.$message.success("添加成功");
          this.$router.push("/projectsList");
        }
      });
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
