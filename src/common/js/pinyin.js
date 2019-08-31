import pinyin from 'pinyin'

export default function convertChinese(name) {
  return pinyin(name, {
    style: pinyin.STYLE_FIRST_LETTER
  })[0][0].toUpperCase()
}
