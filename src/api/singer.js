import { get } from '@/common/js/http'

// 获取歌手
export function getSinner() {
  return get('/toplist/artist')
}

// 歌手详情
export function getSingerDetail(id) {
  return get('/artists', { id })
}
