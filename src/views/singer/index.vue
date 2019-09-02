<template>
  <div class="sinner" ref="sinner">
    <list-view :data="singers" @select="selectSinger" ref="list"></list-view>
    <router-view></router-view>
  </div>
</template>

<script>
import { getSinner } from '../../api/singer'
import convertChinese from '@/common/js/pinyin'
import ListView from '@/base/listView'
import { mapMutations } from 'vuex'
import { playlistMixin } from 'common/js/mixin'

const HOT_NAME = '热门'
const HOT_SINGER_LEN = 10
export default {
  mixins: [playlistMixin],
  data() {
    return {
      singers: []
    }
  },
  created() {
    this._getSingerList()
  },
  methods: {
    ...mapMutations(['SET_SINGER']),
    selectSinger(item) {
      this.$router.push({
        path: '/singer/' + item.id + ''
      })
      this.SET_SINGER(item)
    },
    handlerPlaylist(playlist) {
      if (!playlist) return
      const bottom = playlist.length ? '60px' : ''
      this.$refs.sinner.style.bottom = bottom
      this.$refs.list.refresh()
    },
    _getSingerList() {
      getSinner().then(res => {
        this.singers = this._normalizeSinger(res.list.artists)
      })
    },
    _normalizeSinger(list) {
      let map = {
        hot: {
          title: HOT_NAME,
          items: []
        }
      }
      list.forEach((item, index) => {
        if (index < HOT_SINGER_LEN) {
          map.hot.items.push({
            id: item.id,
            name: item.name,
            avatar: item.picUrl
          })
        }
        const key = convertChinese(item.name).substring(0, 1)
        if (!map[key]) {
          map[key] = {
            title: key,
            items: []
          }
        }
        map[key].items.push({
          id: item.id,
          name: item.name,
          avatar: item.picUrl
        })
      })
      let hot = []
      let ret = []
      Object.keys(map).forEach(k => {
        if (map[k].title === HOT_NAME) {
          hot.push(map[k])
        } else {
          ret.push(map[k])
        }
      })
      ret.sort((a, b) => a.title.charCodeAt(0) - b.title.charCodeAt(0))
      return hot.concat(ret)
    }
  },
  components: {
    ListView
  }
}
</script>

<style lang="stylus" scoped>
.sinner
  position: fixed
  top: 88px
  bottom: 0
  width: 100%
</style>
