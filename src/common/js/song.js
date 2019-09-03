import { getLyric } from 'api/song'

export default class Song {
  constructor({ id, mid, singer, name, album, duration, image, url }) {
    this.id = id
    this.mid = mid
    this.singer = singer
    this.name = name
    this.album = album
    this.duration = duration
    this.image = image
    this.url = url
  }
  getLyric() {
    if (this.lyric) return Promise.resolve(this.lyric)
    return new Promise((resolve, reject) => {
      getLyric(this.id)
        .then(res => {
          this.lyric = res.lrc.lyric
          resolve(this.lyric)
        })
        .catch(e => reject(e))
    })
  }
}

export function createSong(musicData) {
  return new Song({
    id: musicData.id,
    mid: musicData.al.id,
    singer: mapName(musicData.ar),
    name: musicData.name,
    album: musicData.al.name,
    duration: musicData.dt,
    image: musicData.al.picUrl,
    url: `http://music.163.com/song/media/outer/url?id=${musicData.id}.mp3`
  })
}

export function createSearchSong(musicData) {
  return new Song({
    id: musicData.id,
    mid: musicData.album.id,
    singer: mapName(musicData.artists),
    name: musicData.name,
    album: musicData.album.name,
    duration: musicData.duration / 1000,
    image: musicData.album.img1v1Url,
    url: `http://music.163.com/song/media/outer/url?id=${musicData.id}.mp3`
  })
}

function mapName(singer) {
  if (!singer) return ''
  return singer.map(k => k.name).join('/')
}
