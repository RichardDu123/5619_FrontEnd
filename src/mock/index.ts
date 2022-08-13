import Mock from 'mockjs'
import login from './login'

Mock.setup({
  // 0.2s~0.3s delay
  timeout: '200-300',
})

Mock.mock(/\/getUserInfo/, 'get', login.getUserInfo)
