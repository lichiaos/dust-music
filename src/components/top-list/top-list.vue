<template>
  <transition name="slide">
    <music-list :title="title" :bg-image="bgImage" :songs="songs" rank></music-list>
  </transition>
</template>

<script>
import MusicList from 'components/music-list/music-list'
import { mapGetters } from 'vuex'
import { getTopListDetail } from 'api/rank'
import { createSong } from 'common/js/song'
import { topListMap } from 'common/js/config'

export default {
  name: 'top-list',
  data() {
    return {
      songs: []
    }
  },
  computed: {
    ...mapGetters(['topList']),
    title() {
      return this.topList.name
    },
    bgImage() {
      if (this.songs.length) return this.songs[0].image
      return this.topList.coverImgUrl
    }
  },
  created() {
    this._getTopListDetail()
  },
  methods: {
    _getTopListDetail() {
      if (!this.topList.id) this.$router.push('/rank')
      const id = this._findTopListId()
      getTopListDetail(id).then(res => {
        this.songs = this._normalizeSong(res.playlist.tracks)
        console.log(this.songs)
      })
    },
    _findTopListId() {
      for (const [key, val] of Object.entries(topListMap)) {
        if (this.topList.name === val) return key
      }
    },
    _normalizeSong(list) {
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
.slide-enter-active, .slide-leave-active
	transition: all 0.3s

.slide-enter, .slide-leave-to
	transform: translate3d(100%, 0, 0)
</style>
