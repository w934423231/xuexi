/* eslint-disable vue/no-parsing-error */
<style>
.login {
    width: 100vw;
    height: 100vh;
    /* background-color: #1c2438; */
    background: url('../../assets/b45e8d6da8783f957eeb1d8c1ea61db1.jpg');
    background-size:100%  100%;
    /* background-position-y: -30px;/0 */
    padding:0px 40px;
    box-sizing: border-box;
    display: flex;
    justify-content: flex-end;
    align-items: center;
}
.login .from-wrap{
    width: 400px;
    height: 320px;
    border-radius: 10px;
    background-color: #fff;
    padding: 20px 30px;
}
.login h2 {
    text-align: center;
    margin-bottom: 20px;
}
.login FormItem {
    margin-bottom: 15px;
}
.login .form-footer {
    text-align: right;
}
.ivu-form-item-required .ivu-form-item-label:before {
    display: none;
}
</style>
<template>
    <div class="login">
        <div class="from-wrap">
            <h2>周黑鸭后台管理系统</h2>
            <el-form ref="loginData" :model="loginData" :rules="ruleValidate" >
                <el-form-item label="Account" prop="acct">
                    <el-input type="text" v-model="loginData.acct" placeholder="请输入账号"> </el-input>
                </el-form-item>
                <el-form-item label="Password" prop="pass">
                    <el-input type="password" v-model="loginData.pass" placeholder="请输入密码"></el-input>
                </el-form-item>
                <el-form-item class="form-footer">
                    <el-button type="primary" @click="handleSubmit('loginData')">Login</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>

export default {
  data () {
    return {
      loginData: {
        acct: '',
        pass: '',
        userToken: {},
        data: {}
      },
      ruleValidate: {
        acct: [
          { required: true, message: '账号不能为空', trigger: 'blur' },
          { min: 3, max: 16, message: '账号长度3-16个字符', trigger: 'blur' }
        ],
        pass: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { type: 'string', min: 6, max: 16, message: '密码长度6-16个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          console.log(this.loginData)
          let reg = {
            vname: this.loginData.acct,
            vpw: this.loginData.pass
          }
          this.$store.dispatch('logins', reg).then((result) => {
            console.log(result)
            if (result.status === 200) {
              this.$router.push({ path: '/shopList' })
            }
          })
        } else {
          console.log('请认真填写数据')
        }
        //    if(this.loginData.acct==123 &&this.loginData.pass==123456){
        //       this.$router.push({path:'/index/setshop'})
        //       this.$Message.success('提交成功!')
        //   }else{
        //       this.$Message.error('账号密码错误!')
        //   }
        // if (valid) {
        //   console.log(this.loginData)

        // } else {
        //   this.$Message.error('表单验证失败!')
        // }
      })
    },
    handleReset (name) {
      // this.$refs[name].resetFields();
      console.log('前去注册')
      this.$router.push({ path: '/zhuce' })
    }
  }
}
</script>
