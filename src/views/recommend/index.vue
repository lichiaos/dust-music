<template>
  <div class="recommend" ref="recommend">
    <scroll class="recommendContent" ref="scroll" :data="discList">
      <div>
        <div v-if="recommends.length" class="sliderWrapper">
          <slider>
            <div v-for="item in recommends" :key="item.src">
              <a :href="item.url">
                <img :src="item.pic" @load="loadImage" alt="轮播图" />
              </a>
            </div>
          </slider>
        </div>
        <div class="recommendList">
          <h1 class="listTitle">热门歌单内容</h1>
          <ul>
            <li v-for="(item, index) in discList" :key="index" class="item">
              <div class="icon">
                <img width="60" v-lazy="item.coverImgUrl" alt="歌单" />
              </div>
              <div class="text">
                <h2 class="name">{{ item.name }}</h2>
                <p class="desc">{{ item.description }}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="loadingContainer" v-show="!discList.length">
        <loading></loading>
      </div>
    </scroll>
  </div>
</template>

<script>
import { getRecommend, getResource } from '@/api/recommend'
import Slider from '@/base/slider/slider'
import Loading from '@/base/loading/loading'
import Scroll from '@/base/scroll'
import { playlistMixin } from 'common/js/mixin'

export default {
  mixins: [playlistMixin],
  data() {
    return {
      recommends: [],
      discList: []
    }
  },
  created() {
    this._getRecommend()
    this._getDiscList({ limit: 20 })
  },
  methods: {
    handlerPlaylist(playlist) {
      if (!playlist) return
      const bottom = playlist.length ? '60px' : ''
      this.$refs.recommend.style.bottom = bottom
      this.$refs.scroll.refresh()
    },
    _getRecommend() {
      getRecommend().then(res => {
        this.recommends = res.banners
      })
    },
    _getDiscList(param) {
      getResource(param).then(res => {
        this.discList = res.playlists
      })
    },
    loadImage() {
      if (!this.checkloaded) {
        this.checkloaded = true
        this.$refs.scroll.refresh()
      }
    }
  },
  components: {
    Slider,
    Scroll,
    Loading
  }
}
</script>

<style lang="stylus" scoped>
@import "~@/common/stylus/variable"
@import "~@/common/stylus/mixin"
.recommend
  position: fixed
  width: 100%
  top: 88px
  bottom: 0
  .recommendContent
    position: relative
    height: 100%
    overflow: hidden
    .sliderWrapper
      position: relative
      width: 100%
      overflow: hidden
    .recommendList
      .listTitle
        height: 65px
        line-height: 65px
        text-align: center
        font-size: $font-size-medium
        color: $color-theme
      .item
        display: flex
        box-sizing: border-box
        align-items: center
        padding: 0 20px 20px 20px
        .icon
          flex: 0 0 60px
          padding-right: 20px
        .text
          display: flex
          flex-direction: column
          justify-content: center
          flex: 1
          line-height: 20px
          overflow: hidden
          font-size: $font-size-medium
          .name
            margin-bottom: 10px
            color: $color-text
          .desc
            no-wrap()
            color: $color-text-d
    .loadingContainer
      position: absolute
      top: 50%
      left: 50%
      transform translate(-50%, -50%)
</style>
