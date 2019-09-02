import { post, get } from '@/common/js/http'

// 轮播图
export function getRecommend() {
  return post('/banner', { type: 1 })
}

// 获取每日推荐歌单
export function getResource(param) {
  return get('/top/playlist/highquality', param)
}

export function getDisc(id) {
  return get('/playlist/detail', { id })
}
