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
 * 添加文章
 * @param data
 * @returns {*}
 */
export function addBlog(data) {
  return request({
    url: '/api/blog',
    method: 'post',
    data
  })
}

/**
 * 编辑文章
 * @param blogInfo
 */
export function editBlog(blogInfo){
  return request({
    url: `/api/blog/${blogInfo.id}`,
    method: 'put',
    data: blogInfo.data
  })
}

/**
 * 获取一个文章
 * @param id
 */
export function getOneBlog(id){
  return request({
    url: `/api/blog/${id}`,
    method: 'get'
  })
}

