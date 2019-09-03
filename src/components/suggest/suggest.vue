<template>
  <div class="suggest">
    <div class="suggest-list">
      <li class="suggest-item" v-for="(item, index) in songs" :key="index">
        <div class="icon">
          <i class="icon-music"></i>
        </div>
        <div class="name">
          <p class="text">{{ item.name }}</p>
        </div>
      </li>
    </div>
  </div>
</template>

<script>
import { getSearchRes } from 'api/search'
import { createSearchSong } from 'common/js/song'
import { debounce } from 'common/js/util'

const LIMIT = 30
export default {
  name: 'seggest',
  props: {
    query: {
      type: String,
      default: ''
    },
    showSinger: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      page: 1,
      songs: []
    }
  },
  methods: {
    search(keyword = this.query) {
      const param = {
        keyword,
        limit: LIMIT * this.page
      }
      getSearchRes(param).then(res => {
        this.songs = this._normalizeSongs(res.result.songs)
      })
    },
    _normalizeSongs(list) {
      let ret = []
      list.forEach(item => {
        if (item.id && item.album.id) {
          ret.push(createSearchSong(item))
        }
      })
      return ret
    }
  },
  watch: {
    query(newQuery) {
      if (!newQuery) return
      debounce(this.search(newQuery), 500)
    }
  }
}
</script>

<style lang="stylus" scoped>
@import "~common/stylus/variable"
@import "~common/stylus/mixin"

.suggest
  height: 100%
  overflow: hidden
  .suggest-list
    padding: 0 30px
    .suggest-item
      display: flex
      align-items: center
      padding-bottom: 20px
    .icon
      flex: 0 0 30px
      width: 30px
      [class^="icon-"]
        font-size: 14px
        color: $color-text-d
    .name
      flex: 1
      font-size: $font-size-medium
      color: $color-text-d
      overflow: hidden
      .text
        no-wrap()
  .no-result-wrapper
    position: absolute
    width: 100%
    top: 50%
    transform: translateY(-50%)
</style>
