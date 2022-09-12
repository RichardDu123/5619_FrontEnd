import request from '@/utils/request'

export const GetPetList = (params: object): Promise<any> => {
  return request('/get-pet-list', 'get', params)
}
