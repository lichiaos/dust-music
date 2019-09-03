/**
 * 返回包含上下限的随机数
 * @param min
 * @param max
 * @returns {number}
 */
export function getRandomInt(min, max) {
  return (Math.random() * (max - min + 1) + min) | 0
}

export function shuffle(arr) {
  let _arr = arr.slice()
  for (let i = 0; i < _arr.length; i++) {
    let j = getRandomInt(0, i)
    let t = _arr[i]
    _arr[i] = _arr[j]
    _arr[j] = t
  }
  return _arr
}

export function debounce(fn, delay) {
  let timer
  return () => {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      fn()
    }, delay)
  }
}
