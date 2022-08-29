import { Toast } from 'vant'
import 'vant/es/toast/style'
export const usernameValidator = async (
  username: string
): Promise<string | boolean> => {
  if (!/^[\da-zA-Z]{6,10}$/.test(username)) {
    return 'Username must contain 6-10 alphabetical and numeric characters!'
  }
  Toast.loading({
    forbidClick: true,
  })
  await new Promise((resolve) =>
    setTimeout(() => {
      Toast.clear()
      resolve(1)
    }, 2000)
  )
  return true
}

export const passwordValidator = (password: string): string | boolean => {
  if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password)) {
    return 'Password must contain contain 8 characters, at least one letter and one number!'
  } else {
    return true
  }
}
export const emailValidator = (str: string): string | boolean => {
  if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(str)) {
    return 'Invalid Email address'
  } else {
    return true
  }
}
