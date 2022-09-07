import request from '@/utils/request'

export const getUserInfo = (params: object): Promise<any> => {
  return request('/login', 'post', params)
}

export const signUp = (params: object): Promise<any> => {
  return request('/signup', 'post', params)
}
export const checkId = (params: object): Promise<any> => {
  return request('/username', 'get', params)
}
