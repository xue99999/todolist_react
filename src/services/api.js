import {post, get, put, del} from "../utils/request";

// 用户登录
export async function login(params) {
  return post('/token', params)
}

// 获取todolist
export async function thingList(params) {
  return get('/thing', params)
}

// 获取todolist
export async function addThing(params) {
  return post('/thing', params)
}

// 获取todolist
export async function changeThing(params) {
  return put(`/thing/${params.id}`, params)
}

// 获取todolist
export async function delThing(params) {
  return del(`/thing/${params.id}`)
}