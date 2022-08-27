import request from '@/utils/request'

export const getPosts = (params: object): Promise<any> => {
  return request('/getPosts', 'get', params)
}
