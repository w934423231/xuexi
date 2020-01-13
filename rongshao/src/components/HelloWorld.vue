<template>
<div>
  <div>
    <button @click="userlogin" >点击登录</button>
  <span>{{getname}}</span>
  <button value="num++" @click="appdnum"></button>
  <span>{{getnum}}</span>
  </div>
  <div>
    <button @click="user" value="请点击"></button>
  <span>{{getusername}}</span>
  <button value="num++" @click="appdnums"></button>
  <span>{{getusernum}}</span>
  <span></span>
  </div>
</div>
</template>

<script>
import {mapActions, mapMutations, mapState, mapGetters} from 'vuex'
export default {
  name: 'HelloWorld',
  data () {
    return {
    }
  },
  created () {
    console.log(this.$rout)
  },
  methods: {
    userlogin () {
      console.log(this.$store)
      this.$store.dispatch('login', 'rongshao').then((res) => {
        if (res.status === 200) {
          this.$router.push({name: 'product'})
        }
      })
    },
    user () {
      console.log(this.$store)
      this.$store.dispatch('logins', 'lietu')
    },
    ...mapActions({
      // login: 'login',
      appdnum: 'appdnum',
      appdnums: 'appdnums'
    }),
    ...mapMutations({
      changeuname: 'changeuname',
      changeunum: 'changeunum',
      changeunames: 'changeunames',
      changeunums: 'changeunums'
    })
  },
  computed: {
    // usernname () {
    //   return this.$store.state.uname
    // }
    ...mapState({
      uname: state => state.app.uname,
      unum: state => state.app.unum,
      username: state => state.user.uname,
      usernum: state => state.user.unum
    }),
    ...mapGetters({
      getnum: 'getnum',
      getname: 'getname',
      getusernum: 'getusernum',
      getusername: 'getusername'
    })
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
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
