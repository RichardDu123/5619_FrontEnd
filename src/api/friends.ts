import request from '@/utils/request'

export const GetFriendList = (params: object): Promise<any> => {
  return request('/get-friend-list', 'get', params)
}
