import request from '@/utils/request'

export const getUserInfo = (params: object): Promise<any> => {
  return request('/getUserInfo', 'get', params)
}
