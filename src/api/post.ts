import request from '@/utils/request'

export const getPosts = (params: object): Promise<any> => {
  return request('/getPosts', 'get', params)
}

export const submitPosts = (params: object): Promise<any> => {
  return request('/upload', 'post', params)
}
