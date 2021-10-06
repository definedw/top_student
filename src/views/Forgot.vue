<template>
  <div class="login-page">
    <div class="login-content">
      <div class="header-logo">
        <div class="logo">
          <img src="../assets/student/login-logo.png"
               alt="Top Education Institute" />
        </div>
      </div>
      <div class="login-box">
        <div class="login-logo">
          <img src="../assets/student/login-logo.png"
               alt="Top Education Institute" />
        </div>

        <div class="login-head">
          <h1>Reset Password</h1>
        </div>

        <div class="login-form">
          <el-form :model="formData"
                   :rules="rules"
                   ref="ruleForm">
            <div class="rigister-container">
              <div class="login-info">Enter your email and we send you a password reset.</div>
              <el-form-item prop="email"
                            label="Your email address">
                <el-input v-model="formData.email"
                          placeholder="Your email address."></el-input>
              </el-form-item>
              <div class="login-bar">
                <button type="submit"
                        class="btn-login">Send Request</button>
              </div>
              <div class="forgot-link">
                <router-link to="/login"
                             class="forgot">Sign in</router-link>
              </div>
            </div>
          </el-form>
        </div>
      </div>
      <div class="login-pic"></div>
    </div>

    <div class="login-footer">
      &copy; 2019 Roweyda Mdt Info Tech Ltd. All rights reserved.
    </div>

    <div class="login-bg">
      <div class="bg-box-1"></div>
      <div class="bg-box-2"></div>
      <div class="bg-box-3"></div>
    </div>
  </div>
</template>

<script>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import store from '@/stores'
import request from '@/utils/request'
export default {
  setup() {
    const formData = reactive({
      email: '', loginTarget: 'Current_Student_Entrance'
    })
    const router = useRouter()
    const ruleForm = ref(null)
    const rules = {
      email: [
        { required: true, message: 'Please enter your email address.', trigger: 'blur' },
        { type: 'email', message: 'Please correct email address.', trigger: ['blur', 'change'] }
      ]
    }
    const formSubmit = async () => {
      const data = { ...formData },
        url = '/public/auth/user/forgetPassword'
      ruleForm.value.validate(valid => {
        if (valid) {
          request.post(url, data).then(({ data }) => {
            if (data) {
              ElMessage({
                type: 'success',
                message: 'Please check your email and click reset password link'
              })
              store.dispatch('commitUserInfo', data)
              router.push('/home')
            }
          })
        }
      })
    }
    return {
      formData,
      rules,
      formSubmit
    }
  }
}
</script>
