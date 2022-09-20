import request from '@/utils/request'

export const getPosts = (params: object): Promise<any> => {
  return request('/getPosts', 'get', params)
}

export const submitPosts = (params: object): Promise<any> => {
  return request('/post/newPost', 'post', params)
}

export const createPet = (params: object): Promise<any> => {
  return request('/pet/newPet', 'post', params)
}

export const getImage = (params: object): Promise<any> => {
  return request('/getImage', 'get', params)
}

export const getPostById = (url: string, params: object): Promise<any> => {
  return request(`/getPost/${url}`, 'get', params)
}
