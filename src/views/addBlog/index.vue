<template>
  <div class="app-container">
    <!--文章标题-->
    <div class="block">文章标题</div>
    <div style="margin-bottom: 15px;">
      <el-input v-model="form.title" placeholder="请输入文章标题"></el-input>
    </div>
    <!--文章编辑-->
    <div class="block">文章编辑</div>
    <Editor
      ref="toastuiEditor"
      :initialValue="form.editorText"
      height="600px"
    />
    <!--文章描述-->
    <div class="block">文章描述</div>
    <el-input type="textarea" v-model="form.description" :rows="6"></el-input>

    <!--文章头图上传-->
    <Upload upload-title="文章头图" v-model="form.thumb"/>

    <!--选择分类-->
    <div class="block">选择分类</div>
    <el-select v-model="form.select" placeholder="请选择文章分类">
      <el-option v-for="item in blogType" :key="item.id"
                 :label="item.name" value="item.id"></el-option>
    </el-select>

    <div>
      <el-button type="primary" style="margin-top: 15px;"
                 @click="addArticleHandle">发布文章
      </el-button>
    </div>
  </div>
</template>

<script>
import {Editor} from "@toast-ui/vue-editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import Upload from "@/components/Upload.vue";
import {getBlogType} from "@/api/blog";

export default {
  components: {
    Editor,
    Upload,
  },
  created() {
    getBlogType().then(res => {
      this.blogType = res.data;
    })
  },
  data() {
    return {
      form: {
        title: "",
        editorText: "",
        description: "",
        thumb: "",
        select: "",
      },
      blogType: [],
    };
  },
  methods: {
    addArticleHandle() {

    }
  },
}
</script>

<style lang="scss" scoped>
.block {
  margin: 15px 0;
  font-weight: 100;
}
</style>
