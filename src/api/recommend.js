import { post } from '@/common/js/http'

export function getRecommend() {
  return post('/banner', { type: 1 })
}
