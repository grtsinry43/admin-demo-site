<template>
  <div class="app-container">
    <el-table loading="isLoading"
              :data="data"
              element-loading-text="拼命加载中"
              border
              fit
              highlight-current-row
    >
      <el-table-column prop="id" label="序号" align="center" width="60">
        <template slot-scope="scope">{{ scope.$index + 1 }}</template>
      </el-table-column>

      <el-table-column prop="name" label="项目名称" align="center" width="150">
        <template slot-scope="scope">
          <a :href="scope.row.url" target="_blank" class="pro-name">{{ scope.row.name }}</a>
        </template>
      </el-table-column>

      <el-table-column prop="desc" label="项目描述" align="center">
        <template slot-scope="scope">{{ scope.row.description.toString() }}</template>
      </el-table-column>

      <el-table-column prop="thumb" label="预览图" align="center" width="150">
        <template slot-scope="scope">
          <el-image
            style="width: 100px"
            :src="scope.row.thumb"
            fit="contain"
            :preview-src-list="srcList"
          ></el-image>
        </template>
      </el-table-column>

      <el-table-column prop="action" label="操作" align="center" width="150">
        <template slot-scope="scope">
          <el-tooltip
            class="item"
            effect="dark"
            content="github"
            placement="top"
            :hide-after="2000"
          >
            <el-button
              circle
              size="mini"
              style="background: #000;"
              @click="openGithubHandle(scope.row)"
            >
              <i class="iconfont icon-github" style="color: #fff"></i>
            </el-button>
          </el-tooltip>

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
              @click="editProjectHandle(scope.row)"
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
              @click="deleteProjectHandle(scope.row)"
            ></el-button>
          </el-tooltip>
        </template>
      </el-table-column>

    </el-table>
    <!--编辑对话框-->
    <el-dialog title="编辑项目" :visible.sync="dialogFormVisible" fullscreen>
      <el-form :model="form">
        <el-form-item label="项目名称">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="项目描述（请使用英文逗号分割）">
          <el-input v-model="form.description" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="github地址">
          <el-input v-model="form.github" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="项目地址">
          <el-input v-model="form.url" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="预览图">
          <Upload v-model="form.thumb"/>
        </el-form-item>
        <el-form-item label="排序等级">
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
        <el-button type="primary" @click="editProjectSubmitHandle">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {deleteProject, editProject, getProjects} from "@/api/project";
import {SERVER_URL} from "@/urlConfig";
import Upload from "@/components/Upload.vue";

export default {
  data() {
    return {
      data: [],
      isLoading: false,
      srcList: [],
      dialogFormVisible: false,
      formLabelWidth: '100px',
      id: null,
      form: {
        name: "",
        description: "",
        url: "",
        github: "",
        thumb: "",
        order: 1
      }
    }
  },
  components: {
    Upload
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.isLoading = true;
      getProjects().then(res => {
        this.data = res.data;
        this.isLoading = false;
        for (let i of this.data) {
          i.thumb = SERVER_URL + i.thumb;
          this.srcList.push(i.thumb);
        }
      })
    },
    openGithubHandle(projectInfo) {
      window.open(projectInfo.github);
    },
    editProjectHandle(projectInfo) {
      console.log(projectInfo)
      this.dialogFormVisible = true;
      this.id = projectInfo.id;
      this.form.name = projectInfo.name;
      this.form.description = projectInfo.description.toString();
      this.form.url = projectInfo.url;
      this.form.github = projectInfo.github;
      this.form.thumb = projectInfo.thumb;
      this.form.order = projectInfo.order;
      console.log(this.form)
    },
    deleteProjectHandle(projectInfo) {
      this.$confirm('此操作将永久删除该项目, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteProject(projectInfo.id).then(() => {
          this.fetchData();
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    editProjectSubmitHandle() {
      editProject({
        id: this.id,
        data: {
          ...this.form,
          order: this.form.order,
          description: this.form.description.split(',')
        }
      }).then((res) => {
        this.fetchData();
        this.dialogFormVisible = false;
        this.$message({
          type: 'success',
          message: '更新成功!'
        });
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.pro-name:hover {
  color: #20a0ff;
}
</style>
