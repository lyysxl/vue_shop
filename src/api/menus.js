import request from './request'

/**
 * 获取菜单列表
 * @returns {Promise<{data: {}}>}
 */
export const getMenus = () => {
  return request.get('/menus')
}