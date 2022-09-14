import request from '@/utils/request'

export const GetFriendList = (params: object): Promise<any> => {
  return request('/getFriendList', 'get', params)
}

export const GetFriendRequestList = (params: object): Promise<any> => {
  return request('/getFriendRequestList', 'get', params)
}
