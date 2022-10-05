export interface Pet {
  petName: string
  category: string
  petImageAddress: string
  petDescription: string
  petId: number
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

export interface TrendingPost {
  topic: string
  postId: number
}

export interface Advertisement {
  imgUrl: string
}
