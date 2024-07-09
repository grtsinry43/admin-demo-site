<template>
  <div class="app-container">
    <div style="margin-top: 15px">
      <el-input placeholder="左侧选择排序权重，输入要添加的分类标签" v-model="input3"
                class="input-with-select blogAddInput">
        <el-select v-model="select" slot="prepend">
          <el-option label="1" value="1"></el-option>
          <el-option label="2" value="2"></el-option>
          <el-option label="3" value="3"></el-option>
          <el-option label="4" value="4"></el-option>
          <el-option label="5" value="5"></el-option>
        </el-select>
      </el-input>
      <el-button type="primary" style="margin-left: 10px;" @click="addBlogTypeHandle">添加</el-button>
    </div>

    <el-table :data="data" style="width: 100%" border>
      <el-table-column prop="id" label="序号" align="center" width="100">
        <template slot-scope="scope">{{ scope.$index + 1 }}</template>
      </el-table-column>
      <el-table-column prop="name" label="博客类别" align="center">
        <template slot-scope="scope">{{ scope.row.name }}</template>
      </el-table-column>
      <el-table-column prop="articleCount" label="文章数量" width="150" align="center">
        <template slot-scope="scope">{{ scope.row.articleCount }}</template>
      </el-table-column>
      <el-table-column label="操作" width="150px" align="center">
        <template slot-scope="scope">
          <el-tooltip
            class="item"
            effect="dark"
            content="编辑"
            placement="top"
            :hide-after="2000"
          >
            <el-button
              type="primary"
              icon="el-icon-edit"
              circle
              size="mini"
              @click="editBlogTypeHandle(scope.row)"
            ></el-button>
          </el-tooltip>
          <el-tooltip
            class="item"
            effect="dark"
            content="删除"
            placement="top"
            :hide-after="2000"
          >
            <el-button
              type="danger"
              icon="el-icon-delete"
              circle
              size="mini"
              @click="deleteBlogTypeHandle(scope.row)"
            ></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="编辑文章分类" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="分类名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="排序等级" :label-width="formLabelWidth">
          <el-select v-model="form.order" placeholder="请选择排序等级">
            <el-option label="1" value="1"></el-option>
            <el-option label="2" value="2"></el-option>
            <el-option label="3" value="3"></el-option>
            <el-option label="4" value="4"></el-option>
            <el-option label="5" value="5"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmEditBlogTypeHandle">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {addBlogType, deleteBlogType, getBlogType, getOneBlogType, updateBlogType} from "@/api/blogType";

export default {
  data() {
    return {
      input3: '',
      select: '1',
      listLoading: false,
      data: [],
      dialogFormVisible: false,
      form: {
        name: "",
        order: "",
      },
      formLabelWidth: "80px",
    }
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.listLoading = true;
      getBlogType().then(res => {
        console.log(res);
        this.data = res.data;
        this.listLoading = false;
      })
    },
    addBlogTypeHandle() {
      if (this.input3) {
        addBlogType({
          name: this.input3,
          order: this.select ? this.select : '1',
        });
        this.fetchData();
        this.$message.success("添加成功");
      } else {
        this.$message.error("分类名称不能为空");
      }
    },
    editBlogTypeHandle({id}) {
      getOneBlogType(id).then(res=>{
        this.form = res.data;
        this.dialogFormVisible = true;
      })
    },
    confirmEditBlogTypeHandle(){
      updateBlogType({
        id : this.form.id,
        data : this.form
      }).then(()=>{
        this.fetchData();
        this.$message.success('更新分类信息成功');
        this.dialogFormVisible = false;
      })
    },
    deleteBlogTypeHandle({id}) {
      this.$confirm(
        "删除该分类后，该分类下所有文章将变为未分类，是否继续？",
        "是否删除此文章分类",
        {
          type: "warning",
        }
      ).then(() => {
        console.log(id)
        deleteBlogType(id).then(() => {
          this.$message.success("删除成功");
          this.fetchData();
        });
      });
    },
  }
}
</script>

<style lang="scss" scoped>
.blogAddInput {
  width: 450px;
  margin-bottom: 20px;
}
</style>
