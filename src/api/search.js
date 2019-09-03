import { get } from 'common/js/http'

export function getHotKey() {
  return get('/search/hot')
}

export function getSearchRes(keywords, limit = 30) {
  return get('/search', { keywords, limit })
}
