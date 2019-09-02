import { mapGetters } from 'vuex'

export const playlistMixin = {
  computed: {
    ...mapGetters(['playlist'])
  },
  mounted() {
    this.handlerPlaylist(this.playlist)
  },
  activated() {
    this.handlerPlaylist(this.playlist)
  },
  watch: {
    playlist(newVal) {
      this.handlerPlaylist(newVal)
    }
  },
  methods: {
    handlerPlaylist() {
      throw new Error('component must implement handlerPlaylist method')
    }
  }
}
