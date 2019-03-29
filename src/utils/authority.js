// 获取当前权限
export function getToken(){
  const str=localStorage.getItem('authority');
  // basicAuth 'Basic ' + Base64(token:password) password在服务器端为空
  return str ? 'Basic ' + window.btoa(str+":"):null;
}

// use localStorage to store the authority info, which might be sent from server in actual project.
export function getAuthority() {
  return getToken()?'user':null;
}

export function setAuthority(authority) {
  return localStorage.setItem('authority', authority);
}

