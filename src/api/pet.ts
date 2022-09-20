import request from '@/utils/request'

export const GetPetList = (params: object): Promise<any> => {
  return request('/getPetList', 'get', params)
}
