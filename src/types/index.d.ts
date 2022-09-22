export interface Pet {
  name: string
  category: string
  petAvatar: string
  petDescription: string
}

export interface Post {
  imageUrlList: Array<string>
  topic: string
  postId: string
  userId: string
  userAvatar: string
}

export interface User {
  name: string
  description: string
  userAvatar: string
}

export interface NewFriendRequest {
  userName: string
  requestText: string
  userAvatar: string
}
