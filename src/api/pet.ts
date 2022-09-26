import request from '@/utils/request'

export const GetPetList = (params: object): Promise<any> => {
  return request('/getPetList', 'get', params)
}

export const createPet = (params: object): Promise<any> => {
  return request('/pet/newPet', 'post', params)
}
