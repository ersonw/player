<template>
  <div class="hello">
    <vue-aliplayer-v2
        ref="VueAliplayerV2"
        :source="source"
        style="width: 100%;height: 750px"
    />
  </div>
</template>
<script>
import VueAliplayerV2 from 'vue-aliplayer-v2'
import axios from "axios";
import fileDownload from 'js-file-download'
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
        // this.source = data.source
      })
    },
    getOsSystem(source) {
      const ua = navigator.userAgent,
          isWindowsPhone = /(?:Windows Phone)/.test(ua),
          isSymbian = /(?:SymbianOS)/.test(ua) || isWindowsPhone,
          isAndroid = /(?:Android)/.test(ua),
          isFireFox = /(?:Firefox)/.test(ua),
          isChrome = /(?:Chrome|CriOS)/.test(ua),
          isTablet = /(?:iPad|PlayBook)/.test(ua) || (isAndroid && !/(?:Mobile)/.test(ua)) || (isFireFox && /(?:Tablet)/.test(ua)),
          isPhone = /(?:iPhone)/.test(ua) && !isTablet,
          isPc = !isPhone && !isAndroid && !isSymbian && !isFireFox;
      if (isPc) {
        this.source = source
      } else {
        if (isChrome){
          this.source = source
        } else {
          if (source.indexOf('m3u8') > -1){
            fileDownload(source, 'index.m3u8')
          }
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
