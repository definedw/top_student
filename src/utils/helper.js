import { useRoute, useRouter } from 'vue-router'

export const router = useRouter()
export const route = useRoute()

// import { ElMessage, ElPopconfirm } from 'element-plus'

export function sessionGet(key) {
  window.sessionStorage.getItem(key)
}

export function sessionSet(key, val) {
  window.sessionStorage.setItem(key, JSON.stringify(val))
}

export function localGet(key) {
  window.localStorage.getItem(key)
}

export function localSet(key, val) {
  window.localStorage.setItem(key, JSON.stringify(val))
}

export function maskShow() {
  const el = document.getElementById('mask')
  el && (el.style.display = 'block')
}

export function maskHide() {
  const el = document.getElementById('mask')
  el && (el.style.display = 'none')
}

export function routerPush(url) {
  router.push(url)
}
