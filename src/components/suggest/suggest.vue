<template>
  <scroll class="suggest" :data="songs" pullup @scrollToEnd="searchMore" ref="scroll">
    <div class="suggest-list">
      <li class="suggest-item" v-for="(item, index) in songs" :key="index">
        <div class="icon">
          <i class="icon-music"></i>
        </div>
        <div class="name">
          <p class="text">{{ item.name }} - {{ item.singer }}</p>
        </div>
      </li>
      <loading :title="'拼命加载中'" v-show="hasMore"></loading>
    </div>
  </scroll>
</template>

<script>
import { getSearchRes } from 'api/search'
import { createSearchSong } from 'common/js/song'
import { debounce } from 'common/js/util'
import Scroll from 'base/scroll'
import Loading from 'base/loading/loading'

const OFFSET = 1
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
      songs: [],
      hasMore: true
    }
  },
  methods: {
    search(keywords = this.query) {
      this.hasMore = true
      this.$refs.scroll.scrollTo(0, 0)
      this.page = 1
      getSearchRes({
        keywords,
        offset: OFFSET * this.page
      }).then(res => {
        if (res.result.songs) {
          this.songs = this._normalizeSongs(res.result.songs)
          this._checkHasMore(res.result)
        }
      })
    },
    searchMore() {
      if (!this.hasMore) return
      this.page++
      getSearchRes({
        keywords: this.query,
        offset: OFFSET * this.page
      }).then(res => {
        if (res.result.songs) {
          this.songs = this.songs.concat(this._normalizeSongs(res.result.songs))
          this._checkHasMore(res.result)
        }
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
    },
    _checkHasMore(res) {
      if (!res.songs || this.page * LIMIT >= res.songCount) {
        this.hasMore = false
      }
    }
  },
  watch: {
    query(newQuery) {
      if (!newQuery) return
      this.songs = []
      debounce(this.search(newQuery), 500)
    }
  },
  components: {
    Scroll,
    Loading
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
