import request from "@/utils/request";

/**
 * 分页获取文章
 * @return {*}
 * @param page
 * @param limit
 */
export function getBlog(page = 1, limit = 10) {
  return request({
    url: '/api/blog',
    method: 'get',
    params: {
      page,
      limit
    }
  })
}

/**
 * 删除文章
 * @param id
 * @return {*}
 */
export function deleteBlog(id) {
  return request({
    url: `/api/blog/${id}`,
    method: 'delete'
  })
}

/**
 * 添加文章分类
 * @param data
 * @return {*}
 */
export function addBlogType(data) {
  return request({
    url: '/api/blogtype',
    method: 'post',
    data
  })
}

/**
 * 获取文章分类
 * @return {*}
 */
export function getBlogType() {
  return request({
    url: `/api/blogtype`,
    method: 'get'
  })
}

/**
 * 获取一个文章分类
 * @return {*}
 */
export function getOneBlogType(id) {
  return request({
    url: `/api/blogtype/${id}`,
    method: 'get'
  })
}


/**
 * 删除文章分类
 * @param id
 * @return {*}
 */
export function deleteBlogType(id) {
  return request({
    url: `/api/blogtype/${id}`,
    method: 'delete',
  });
}

/**
 * 修改文章分类
 * @return {*}
 * @param editInfo
 */
export function updateBlogType(editInfo) {
  return request({
    url: `/api/blogtype/${editInfo.id}`,
    method: 'put',
    data: editInfo.data
  })
}


