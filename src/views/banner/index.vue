<template>
  <div class="app-container">
    <!-- 数据表格 -->
    <el-table :data="data" style="width: 100%" border>
      <el-table-column prop="id" label="序号" width="60" align="center">
        <template slot-scope="scope">{{ scope.$index + 1 }}</template>
      </el-table-column>
      <el-table-column prop="title" label="标题" width="150" align="center">
        <template slot-scope="scope">{{ scope.row.title }}</template>
      </el-table-column>
      <el-table-column prop="description" label="描述">
        <template slot-scope="scope">{{ scope.row.description }}</template>
      </el-table-column>
      <el-table-column label="中图预览" align="center">
        <template slot-scope="scope">
          <el-image
            style="width: 100px"
            :src="scope.row.midImg2"
            fit="fill"
          ></el-image>
        </template>
      </el-table-column>
      <el-table-column label="大图预览" align="center">
        <template slot-scope="scope">
          <el-image
            style="width: 100px"
            :src="scope.row.bigImg2"
            fit="fill"
          ></el-image>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
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
              @click="editBannerHandle(scope.row)"
            ></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>

    <!-- 编辑首页标语 -->
    <el-dialog title="请编辑信息" :visible.sync="dialogFormVisible" top="5vh">
      <el-form :model="form">
        <!-- 标题 -->
        <el-form-item label="标题">
          <el-input v-model="form.title"></el-input>
        </el-form-item>

        <!-- 描述 -->
        <el-form-item label="描述">
          <el-input v-model="form.description"></el-input>
        </el-form-item>

        <el-row>
          <el-col :span="12">
            <el-form-item label="首页中图">
              <!-- 中图 -->
              <Upload v-model="form.midImg"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="首页大图">
              <!-- 大图 -->
              <Upload v-model="form.bigImg"/>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="editBannerConfirm"
        >确 定
        </el-button
        >
      </div>
    </el-dialog>
  </div>
</template>


<script>
import {getBanner, setBanner} from "@/api/banner.js";
import {SERVER_URL} from "@/urlConfig.js";
// 引入封装好的上传图片组件
import Upload from "@/components/Upload.vue";

export default {
  data() {
    return {
      data: [], // 存储数据
      dialogFormVisible: false, // 编辑对话框是否显示
      form: {
        id: "",
        midImg: "",
        bigImg: "",
        title: "",
        description: "",
      },
    };
  },
  components: {
    Upload,
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      getBanner().then((res) => {
        console.log(res)
        this.data = res.data;
        for (let item of this.data) {
          item.midImg2 = SERVER_URL + item.midImg;
          item.bigImg2 = SERVER_URL + item.bigImg;
        }
      });
    },
    editBannerHandle(bannerInfo) {
      // 1. 将 bannerInfo 的数据给 form 2. 打开 dialog
      this.form = {...bannerInfo};

      this.dialogFormVisible = true;
    },
    editBannerConfirm() {
      // 从表单里面拿到用户修改的数据，发送给服务器
      // 因为 api 文档要求三个首页标语都要发送过去，哪怕只改了其中一个
      let arr = [...this.data];
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].id === this.form.id) {
          arr[i] = this.form
        }
      }
      setBanner(arr).then(res => {
        console.log(res)
        this.dialogFormVisible = false; // 关闭掉对话框
        if (res.code === 0) {
          this.$message({
            message: '修改成功',
            type: 'success'
          });
        } else {
          this.$message.error("修改出现问题");
        }
        this.fetchData();
      })
    }
  },
};
</script>

<style lang="scss" scoped>
</style>
