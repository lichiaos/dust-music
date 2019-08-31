export default class Song {
  constructor({ id, mid, singer, name, album, duration, image }) {
    this.id = id
    this.mid = mid
    this.singer = singer
    this.name = name
    this.album = album
    this.duration = duration
    this.image = image
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
    image: musicData.al.picUrl
  })
}

function mapName(singer) {
  if (!singer) return ''
  return singer.map(k => k.name).join('/')
}
