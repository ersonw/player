<template>
  <div class="hello">
    <div v-for="(item, index) of bannerTop" :key="index" style="height: 150px;width: 100%;margin-top: -20px;">
      <a :href="item.link" target="_blank">
        <img :src="item.src" style="height: 80%;width: 80%;margin: auto;" />
      </a>
    </div>
    <h1>[{{ title }}] -- telebott.com</h1>
    <vue-aliplayer-v2
        ref="VueAliplayerV2"
        :source="source"
        style="width: 100%;height: 650px;margin: 30px;"
    />
    <div v-for="(item, index) of bannerFool" :key="index" style="height: 150px;width: 100%;margin-top: -20px;">
      <a :href="item.link" target="_blank">
        <img :src="item.src" style="height: 80%;width: 80%;margin: auto;" />
      </a>
    </div>
  </div>
</template>
<script>
import VueAliplayerV2 from 'vue-aliplayer-v2'
import axios from "axios";
// import fileDownload from 'js-file-download'
export default {
  name: 'HelloWorld',
  comments: {
    VueAliplayerV2
  },
  props: {
    msg: String
  },
  data() {
    return {
      options: {
        source: this.source,
        isLive: false, // 切换为直播流的时候必填
        format: 'dash' // 切换为直播流的时候必填
      },
      source: '',
      title: '',
      bannerTop: [],
      bannerFool: []
    }
  },
  created() {
    this.getServerResponse(this.getQueryString('id'))
  },
  methods: {
    getServerResponse() {
      const hash = this.getQueryString('hash')
      const id = this.getQueryString('id')
      if (!id || !hash){
        return false
      }
      axios.post("/api/user/player", { id, hash }).then(response => {
        // console.log(response.data)
        const data = (response.data.data)
        this.getOsSystem(data.source)
        document.title = data.title + ' P2P-Player'
        this.title = data.title
        this.bannerTop = data.top
        this.bannerFool = data.fool
      })
    },
    getOsSystem(source) {
      // let file;
      const ua = navigator.userAgent,
          isWindowsPhone = /(?:Windows Phone)/.test(ua),
          isSymbian = /(?:SymbianOS)/.test(ua) || isWindowsPhone,
          isAndroid = /(?:Android)/.test(ua),
          isFireFox = /(?:Firefox)/.test(ua),
          isChrome = /(?:Chrome|CriOS)/.test(ua),
          isTablet = /(?:iPad|PlayBook)/.test(ua) || (isAndroid && !/(?:Mobile)/.test(ua)) || (isFireFox && /(?:Tablet)/.test(ua)),
          isPhone = /(?:iPhone)/.test(ua) && !isTablet,
          isPc = !isPhone && !isAndroid && !isSymbian && !isFireFox;
      if (source.indexOf('m3u8') > -1) {
        // file = this.getQueryString('hash') + '.m3u8'
        // fileDownload(source, file)
      }
      if (isPc) {
        this.source = source
      } else {
        if (isChrome){
          this.source = source
        } else {
          window.location.href = source
        }
      }
    },
    getQueryString(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
      var r = window.location.search.substr(1).match(reg);
      if (r != null) return unescape(r[2]);
      return null;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
