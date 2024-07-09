<template>
  <div class="app-container">
    <!-- 数据表格 -->
    <el-table :data="blogList" style="width: 100%" border>
      <el-table-column prop="date" label="序号" width="60" align="center">
        <template slot-scope="scope">{{ scope.$index + (currentPage - 1) * eachPage + 1 }}</template>
      </el-table-column>

      <el-table-column prop="title" label="文章名称" width="150" align="center">
        <template slot-scope="scope">
          <el-popover
            placement="top-start"
            title="博客预览图"
            width="230"
            trigger="hover"
          >
            <el-image
              style="width: 200px"
              :src="scope.row.thumb"
              fit="contain"
              :preview-src-list="srcList"
            ></el-image>
            <a
              href="#"
              target="_blank"
              @click.prevent="goToTitleHandle(scope.row)"
              slot="reference"
            >{{ scope.row.title }}</a
            >
          </el-popover>
        </template>
      </el-table-column>

      <el-table-column prop="title" label="文章描述" width="150" align="center">
        <template slot-scope="scope">{{ scope.row.description }}</template>
      </el-table-column>

      <el-table-column prop="title" label="浏览数" width="150" align="center">
        <template slot-scope="scope">{{ scope.row.scanNumber }}</template>
      </el-table-column>

      <el-table-column prop="title" label="评论量" width="150" align="center">
        <template slot-scope="scope">{{ scope.row.commentNumber }}</template>
      </el-table-column>

      <el-table-column prop="title" label="所属分类" width="150" align="center">
        <template slot-scope="scope">{{
            scope.row.category === null ? '未分类' : scope.row.category.name
          }}
        </template>
      </el-table-column>

      <el-table-column prop="title" label="创建日期" width="230" align="center">
        <template slot-scope="scope">{{ parseTime(scope.row.createDate) }}</template>
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
              @click="editBlogHandle(scope.row)"
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
              @click="deleteBlogHandle(scope.row)"
            ></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页组件 -->
    <el-pagination
      style="margin-top: 30px"
      background
      :page-size="eachPage"
      :page-sizes="[5, 10, 20]"
      layout="prev, pager, next, total, ->, sizes, jumper"
      :total="this.count"
      @size-change="sizeChangeHandle"
      @current-change="currentChangeHandle"
      @prev-click="prevClickHandle"
      @next-click="nextClickHandle"
    >
    </el-pagination>
  </div>
</template>

<script>
import {getBlog, deleteBlog} from "@/api/blog";
import {parseTime} from "@/utils";
import {FRONTEND_URL, SERVER_URL} from "@/urlConfig";

export default {
  created() {
    this.fetchData()
  },
  data() {
    return {
      blogList: [],
      srcList: [],
      currentPage: 1,
      eachPage: 10,
      totalPage: 0,// 总页数
      count: 0,// 总数据条数
      pagerCurrentPage: 1,// 分页栏当前页码
    }
  },
  methods: {
    parseTime,
    fetchData() {
      getBlog(this.currentPage, this.eachPage).then(({data}) => {
        this.blogList = data.rows;
        for (let i of this.blogList) {
          i.createDate = parseTime(i.createDate, '{y}-{m}-{d} {h}:{i}:{d}');
          i.thumb = SERVER_URL + i.thumb;
          this.srcList.push(i.thumb);
        }
        this.count = data.total;
        this.totalPage = Math.ceil(this.count / this.eachPage);
        // 下面的 if 会在删除文章的时候可能会触发，例如最后一页只有一条数据
        // 删除之后，总页码数就会减一，当前页码数就大于了总页码数，所以要做处理
        if (this.currentPage > this.totalPage) {
          this.currentPage = this.totalPage;
          this.fetchData();
        }
      });
    },
    goToTitleHandle(blogInfo) {
      window.open(`${FRONTEND_URL}/article/${blogInfo.id}`);
    },
    deleteBlogHandle(blogInfo) {
      this.$confirm('此操作将一并删除文章下的所有评论, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteBlog(blogInfo.id).then(() => {
          this.fetchData()
        })
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    editBlogHandle(blogInfo) {
      this.$router.push(`/editBlog/${blogInfo.id}`)
    },
    // 分页相关事件
    sizeChangeHandle(pagerNum) {
      this.eachPage = parseInt(pagerNum);
      this.currentPage = 1;
      // this.pagerCurrentPage = 1;
      this.fetchData();
    },
    currentChangeHandle(pageNum) {
      this.currentPage = parseInt(pageNum);
      this.fetchData();
    },
    prevClickHandle() {
      this.currentPage -= 1;
    },
    nextClickHandle() {
      this.currentPage += 1;
    },
  },
}
</script>

<style lang="scss" scoped>

</style>
