import request from "@/utils/request";

export function getProjects() {
  return request({
    url: '/api/project',
    method: 'get'
  })
}

export function deleteProject(id) {
  return request({
    url: `/api/project/${id}`,
    method: 'delete'
  })
}

export function addProject(data) {
  return request({
    url: '/api/project',
    method: 'post',
    data
  })
}

export function editProject(projectInfo){
  return request({
    url: `/api/project/${projectInfo.id}`,
    method: 'put',
    data: projectInfo.data
  })
}

