// 获取当前权限
export function getToken(){
  const str=localStorage.getItem('todo-authority')
  return str || ''
}

// use localStorage to store the authority info, which might be sent from server in actual project.
export function getAuthority() {
  return getToken() ? 'user' : ''
}

export function setAuthority(authority) {
  return localStorage.setItem('todo-authority', JSON.stringify(authority))
}

