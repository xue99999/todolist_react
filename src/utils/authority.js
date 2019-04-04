// 获取当Token
export function getToken(){
  const str=localStorage.getItem('todo-authority')
  return str ? JSON.parse(str) : null
}

// 获取当前权限
export function getBasicAuth(){
  const str = getToken()
  // basicAuth 'Basic ' + Base64(token:password) password在服务器端为空
  return str ? 'Basic ' + window.btoa(str.token+":") : null
}


// use localStorage to store the authority info, which might be sent from server in actual project.
export function getAuthority() {
  return getToken() ? 'user' : ''
}

export function setAuthority(authority) {
  return localStorage.setItem('todo-authority', JSON.stringify(authority))
}

