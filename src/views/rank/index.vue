<template>
  <div class="rank" ref="rank">
    <scroll class="toplist" ref="toplist" :data="topList">
      <ul>
        <li
          class="item"
          v-for="(top, index) in filterTopList"
          :key="index"
          @click="selectItem(top)"
        >
          <div class="icon">
            <img width="100" height="100" v-lazy="top.coverImgUrl" />
          </div>
          <ul class="songlist">
            <li class="song" v-for="(song, index) in top.tracks" :key="index">
              <span>{{ index + 1 }} </span>
              <span>{{ song.first }} - {{ song.second }}</span>
            </li>
          </ul>
        </li>
      </ul>
      <div class="loading-container" v-show="!topList.length">
        <loading></loading>
      </div>
    </scroll>
    <router-view></router-view>
  </div>
</template>

<script>
import { getToplist } from 'api/rank'
import Scroll from 'base/scroll'
import Loading from 'base/loading/loading'
import { playlistMixin } from 'common/js/mixin'
import { mapMutations } from 'vuex'

export default {
  name: 'index',
  mixins: [playlistMixin],
  created() {
    this._getTopList()
  },
  data() {
    return {
      topList: []
    }
  },
  computed: {
    filterTopList() {
      return this.topList.filter(k => k.tracks.length)
    }
  },
  methods: {
    ...mapMutations(['SET_TOP_LIST']),
    handlerPlaylist(playlist) {
      const bottom = playlist.length ? '60px' : ''
      this.$refs.rank.style.bottom = bottom
      this.$refs.toplist.refresh()
    },
    selectItem(item) {
      this.$router.push(`/rank/${item.id}`)
      this.SET_TOP_LIST(item)
    },
    _getTopList() {
      getToplist().then(res => {
        this.topList = res.list
        console.log(res.list)
      })
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

.rank
  position: fixed
  width: 100%
  top: 88px
  bottom: 0
  .toplist
    height: 100%
    overflow: hidden
    .item
      display: flex
      margin: 0 20px
      padding-top: 20px
      height: 100px
      &:last-child
        padding-bottom: 20px
      .icon
        flex: 0 0 100px
        width: 100px
        height: 100px
      .songlist
        flex: 1
        display: flex
        flex-direction: column
        justify-content: center
        padding: 0 20px
        height: 100px
        overflow: hidden
        background: $color-highlight-background
        color: $color-text-d
        font-size: $font-size-small
        .song
          no-wrap()
          line-height: 26px
    .loading-container
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>
