import { get } from 'common/js/http'

export function getHotKey() {
  return get('/search/hot')
}

export function getSearchRes({ keywords, offset = 1 }) {
  return get('/search', { keywords, offset })
}
