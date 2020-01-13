<template>
  <div class="hello">
    <button @click="send"></button>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  // mounted () {
  //   this.$socket.emit('connect', 1)
  // },
  data () {
    return {

    }
  },
  methods: {
    send () {
      this.$socket.emit('my other event', { user: 'lietu', pwd: '1531388375' })
    }
  },
  sockets: {
    connect: function () {
      console.log('socket connected')
      // console.log(data)
    },
    customEmit: function (data) {
      console.log('this method was fired by the socket server. eg: io.emit("customEmit", data)')
    },
    myotherevents (data) {
      console.log(data)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
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
