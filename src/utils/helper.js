const ws = window.sessionStorage,
  wl = window.localStorage

// import { ElMessage, ElPopconfirm } from 'element-plus'

export function sessionGet(key) {
  return JSON.parse(ws.getItem(key))
}

export function sessionSet(key, val) {
  ws.setItem(key, JSON.stringify(val))
}

export function sessionRemove(key) {
  ws.removeItem(key)
}

export function localGet(key) {
  return JSON.parse(wl.getItem(key))
}

export function localSet(key, val) {
  wl.setItem(key, JSON.stringify(val))
}

export function localRemove(key) {
  wl.removeItem(key)
}

export function maskShow() {
  const el = document.getElementById('mask')
  el && (el.style.display = 'block')
}

export function maskHide() {
  const el = document.getElementById('mask')
  el && (el.style.display = 'none')
}

export function JSONstringfy(val) {
  return JSON.stringify(val)
}

export function JSONparse(val) {
  return JSON.parse(val)
}

export function addClass(el, cls) {
  if (!el) return
  var curClass = el.className
  var classes = (cls || '').split(' ')

  for (var i = 0, j = classes.length; i < j; i++) {
    var clsName = classes[i]
    if (!clsName) continue

    if (el.classList) {
      el.classList.add(clsName)
    } else if (!hasClass(el, clsName)) {
      curClass += ' ' + clsName
    }
  }
  if (!el.classList) {
    el.className = curClass
  }
}

/* istanbul ignore next */
export function removeClass(el, cls) {
  if (!el || !cls) return
  var classes = cls.split(' ')
  var curClass = ' ' + el.className + ' '

  for (var i = 0, j = classes.length; i < j; i++) {
    var clsName = classes[i]
    if (!clsName) continue

    if (el.classList) {
      el.classList.remove(clsName)
    } else if (hasClass(el, clsName)) {
      curClass = curClass.replace(' ' + clsName + ' ', ' ')
    }
  }
  if (!el.classList) {
    el.className = trim(curClass)
  }
}
