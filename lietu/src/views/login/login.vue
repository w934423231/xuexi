<template>
  <div class="login-wrapper">
    <el-form
      :model="loginForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="活动名称" prop="uname">
        <el-input v-model="loginForm.uname"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="upwd">
        <el-input type="password" v-model="loginForm.upwd" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="loginSubmitForm('ruleForm')">提交</el-button>
        <el-button @click="cnacelSbumitForm()">取消</el-button>
      </el-form-item>
    </el-form>
    <el-select v-model="index" placeholder="">
      <el-option v-for="(item,inde) in data.filter(data=>{if(data.id>num) return data})" :key="inde">{{item.title}}</el-option>
    </el-select>
  </div>
</template>
<script>
export default {
  data () {
    return {
      loginForm: {
        uname: '',
        upwd: ''
      },
      num: 3,
      data: [
        {
          id: 0,
          title: '0'
        },
        {
          id: 1,
          title: '1'
        },
        {
          id: 2,
          title: '2'
        },
        {
          id: 3,
          title: '3'
        },
        {
          id: 4,
          title: '4'
        },
        {
          id: 5,
          title: '5'
        }
      ],
      index: 0,
      rules: {
        uname: [
          { required: true, message: '请输入账号', trigger: 'blur' },
          { min: 1, max: 13, message: '长度在 1 到 13 个字符', trigger: 'blur' }
        ],
        upwd: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      }
    }
  },
  methods: {
    loginSubmitForm (formName) {
      // this.$router.push({ name: 'Layout' })
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$store.dispatch('logins', this.loginForm).then((result) => {
            console.log(result)
            if (result.status === 200) {
              this.$router.push({path: '/layout/user'})
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    cnacelSbumitForm () {}
  }
}
</script>
<style scoped>
.login-wrapper {
  width: 60%;
  margin: 50px auto 0;
}
</style>
