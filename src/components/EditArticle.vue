<template>
  <div>
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
      :options="editorOption"
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
                 :label="item.name" :value="item.id"></el-option>
    </el-select>

    <div>
      <el-button type="primary" style="margin-top: 15px;"
                 @click="addArticleHandle">{{mode === "edit" ? "修改文章" : "发布文章"}}
      </el-button>
    </div>
  </div>
</template>

<script>
import {Editor} from "@toast-ui/vue-editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import Upload from "@/components/Upload.vue";
import {addBlog, editBlog, getOneBlog} from "@/api/blog";
import {getBlogType} from "@/api/blogType";
import "@toast-ui/editor/dist/i18n/zh-cn";

export default {
  props: ["mode"],
  name: 'EditArticle',
  components: {
    Editor,
    Upload,
  },
  created() {
    getBlogType().then(res => {
      this.blogType = res.data;
    });
    if (this.mode === "edit") {
      this.id = this.$route.params.id;
      getOneBlog(this.id).then(({data}) => {
        this.form = data;
        this.form.select = data.category === null ? "" : data.category.id;
        this.$refs.toastuiEditor.invoke("setHTML", data.htmlContent);
      })
    }
  },
  data() {
    return {
      id: null,
      form: {
        title: "",
        editorText: "",
        description: "",
        thumb: "",
        select: "",
      },
      blogType: [],
      editorOption: {
        language: "zh-CN",
      }
    };
  },
  methods: {
    addArticleHandle() {
      let html = this.$refs.toastuiEditor.invoke("getHTML");
      let markdown = this.$refs.toastuiEditor.invoke("getMarkdown");
      let obj = {
        title: this.form.title,
        description: this.form.description,
        createDate: new Date().getTime(),
        categoryId: this.form.select,
        toc: [],
        htmlContent: html,
        thumb: this.form.thumb,
        markdownContent: markdown,
      }
      console.log(obj)
      if (obj.title === "" || obj.description === "" || obj.htmlContent === "" || obj.categoryId === "") {
        this.$message.error("请填写完整信息");
        return;
      }
      if (this.mode === "edit") {
        editBlog({
          id: this.id,
          data: obj
        }).then(res => {
          console.log(res)
          this.$message.success("文章修改成功");
          this.$router.push("/blogList");
        }).catch(err => {
          this.$message.error("修改失败");
        });
      } else {
        addBlog(obj).then(res => {
          console.log(res)
          this.$message.success("文章发布成功");
          this.$router.push("/blogList");
        }).catch(err => {
          this.$message.error("发布失败");
        });
      }
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
