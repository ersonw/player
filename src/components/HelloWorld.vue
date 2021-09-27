<template>
  <div class="hello">
    <vue-aliplayer-v2
        ref="VueAliplayerV2"
        :source="source"
        :options="options"
        style="width: 100%;height: 750px"
    />
  </div>
</template>
<script>
import VueAliplayerV2 from 'vue-aliplayer-v2'
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
      source: 'https://vs13.thisav.com/dash/OeVEbGzBr5xz02iiL1IhFg,1632757120/589052.mpd',
    }
  },
  created() {
    console.log(this.getQueryString('id'))
  },
  methods: {
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
