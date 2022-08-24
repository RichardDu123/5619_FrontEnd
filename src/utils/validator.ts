export const usernameValidator = (username: string): string | boolean => {
  if (!/^[\da-zA-Z]{6,10}$/.test(username)) {
    return 'Username must contain 6-10 alphabetical and numeric characters!'
  } else {
    return true
  }
}

export const passwordValidator = (password: string): string | boolean => {
  if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password)) {
    return 'Password must contain contain 8 characters, at least one letter and one number!'
  } else {
    return true
  }
}
