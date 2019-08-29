<template>
  <div>
    <div class="recommend-contend">
      <div v-if="recommends.length" class="slider-wrapper">
        <slider>
          <div v-for="item in recommends" :key="item.src">
            <a :href="item.bannerId">
              <img :src="item.pic" alt="轮播图" />
            </a>
          </div>
        </slider>
      </div>
      <div class="recommend-list">
        <h1 class="list-title">热门歌单内容</h1>
        <ul></ul>
      </div>
    </div>
  </div>
</template>

<script>
import { getRecommend } from "@/api/recommend";
import Slider from "@/base/slider/slider";

export default {
  data() {
    return {
      recommends: []
    };
  },
  created() {
    this._getRecommend();
  },
  methods: {
    _getRecommend() {
      getRecommend().then(res => {
        this.recommends = res.banners
      });
    }
  },
  components: {
    Slider
  }
};
</script>

<style lang="stylus" scoped></style>
