import request from './request'

/**
 * 获取用户列表
 * @returns {Promise<{data: {}}>}
 */
export const getUserList = (params = {}) => {
  params.pagenum = params.pagenum || 1
  params.pagesize = params.pagesize || 10
  return request.get('/users', {
    params
  })
}

/**
 * 根据id删除用户
 * @param {number} id 用户编号
 * @returns {Promise<{data: {}}>}
 */
export const deleteUserById = (id) => {
  return request.delete(`/users/${id}`)
}

/**
 * 更新用户状态
 * @param {number} id 用户编号
 * @param {boolean} type 用户状态
 * @returns {Promise<{data: {}}>}
 */
export const updateUserState = (id, state) => {
  return request.put(`/users/${id}/state/${state}`)
}

/**
 * 添加用户
 * @param {object} data 用户信息
 * @returns 
 */
export const addUser = (data) => {
  return request.post('/users', data)
}

/**
 * 通过id更新用户信息
 * @param {number} id 用户id
 * @param {object} data 用户信息 
 * @returns 
 */
export const updateUserById = (id, data) => {
  return request.put(`/users/${id}`, data)
}