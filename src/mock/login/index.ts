import Mock from 'mockjs'

export default {
  getUserInfo: (params: object) => {
    const arr = []
    for (let i = 0; i < 5; i++) {
      arr.push(
        Mock.mock({
          id: '@id',
          name: '@cname',
        })
      )
    }
    return { msg: 'success mock data', data: arr }
  },
}
