import { get } from '@/common/js/http'

// 获取歌手
export function getSinner() {
  return get('/toplist/artist')
}
