<template>
  <transition name="slide">
    <music-list :songs="songs" :title="title" :bg-image="bgImage"></music-list>
  </transition>
</template>

<script>
import { mapGetters } from 'vuex'
import { getSingerDetail } from '@/api/singer'
import { createSong } from 'common/js/song'
import MusicList from 'components/music-list/music-list'

export default {
  data() {
    return {
      songs: []
    }
  },
  computed: {
    title() {
      return this.singer.name
    },
    bgImage() {
      return this.singer.avatar
    },
    ...mapGetters(['singer'])
  },
  created() {
    this._getDetail()
  },
  methods: {
    _getDetail() {
      if (!this.singer.id) this.$router.push('/singer')
      getSingerDetail(this.singer.id || this.$route.params.id).then(res => {
        this.songs = this._normalSizeSongs(res.hotSongs)
        console.log(this.songs)
      })
    },
    _normalSizeSongs(list) {
      let ret = []
      list.forEach(k => {
        if (k.id && k.al.id) {
          ret.push(createSong(k))
        }
      })
      return ret
    }
  },
  components: {
    MusicList
  }
}
</script>

<style lang="stylus" scoped>
  @import "~@/common/stylus/variable"
.singer-detail
  position: fixed
  z-index 100
  top: 0
  left: 0
  right: 0
  bottom: 0
  background: $color-background;
.slide-enter-active, .slide-leave-active
  transition: all .3s

.slide-enter, .slide-leave-to
  transform: translate3d(100%, 0, 0)
</style>
