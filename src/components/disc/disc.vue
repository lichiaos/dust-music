<template>
  <transition name="slide">
    <music-list :title="title" :bg-image="bgImage" :songs="songs"></music-list>
  </transition>
</template>

<script>
import MusicList from 'components/music-list/music-list'
import { mapGetters } from 'vuex'
import { getDisc } from 'api/recommend'
import { createSong } from 'common/js/song'

export default {
  name: 'disc',
  data() {
    return {
      songs: []
    }
  },
  computed: {
    ...mapGetters(['disc']),
    title() {
      return this.disc.name
    },
    bgImage() {
      return this.disc.coverImgUrl
    }
  },
  created() {
    this._getDisc()
  },
  methods: {
    _getDisc() {
      if (!this.disc.id) this.$router.push('/recommend')
      getDisc(this.disc.id).then(res => {
        this.songs = this._normalizeSong(res.playlist.tracks)
        console.log(this.songs)
      })
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
