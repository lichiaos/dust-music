import { get } from 'common/js/http'

export function getToplist() {
  return get('/toplist/detail')
}

export function getTopListDetail(idx) {
  return get('/top/list', { idx })
}
