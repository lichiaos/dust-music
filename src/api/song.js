import { get } from 'common/js/http'

export function getLyric(id) {
  return get('/lyric', { id })
}
