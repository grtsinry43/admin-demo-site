<template>
  <div>
    <!-- 上传组件标题 -->
    <div class="block">{{ uploadTitle }}</div>
    <!-- 上传控件 -->
    <el-upload
      class="avatar-uploader"
      action="/api/upload"
      :show-file-list="false"
      :before-upload="checkImg"
      :on-success="handleAvatarSuccess"
      :headers="headers"
    >
      <img v-if="value" :src="imageUrl" class="avatar"/>
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
  </div>
</template>

<script>
import {SERVER_URL} from '@/urlConfig.js'

export default {
  name: 'Upload',
  props: ["uploadTitle", "value"],
  computed: {
    imageUrl() {
      if (this.value) {
        return SERVER_URL + this.value;
      }
    },
    headers() {
      return {
        Authorization: 'Bearer ' + localStorage.getItem('adminToken'), // 从本地获取 token，添加到 header 里面
      }
    }
  },
  methods: {
    handleAvatarSuccess(res) {
      if (!res.code && res.data) {
        // 说明上传成功，服务器给我们返回了图片上传后的服务器地址
        this.$emit('input', res.data);
      }
    },
    checkImg(){
      //图片大小不正确

    }
  },
};
</script>

<style lang="scss" scoped>
.block {
  margin: 15px 0;
  font-weight: 100;
}

.avatar-uploader .el-upload {
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}

.avatar-uploader-icon {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
