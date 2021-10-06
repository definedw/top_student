<template>
  <div>
    <tab-list main-name="Change Password"
              main-url="/setting"></tab-list>
    <div class="page-inner"
         style="width: 500px; margin: 0 auto">
      <div class="card">
        <div class=" change">
          <div class="group-title"
               style="padding-left: 15px;">
            Change Sign In Password
          </div>
          <div class="page-form">
            <el-form :model="formData"
                     :rules="rules"
                     ref="ruleForm"
                     label-width="auto">
              <el-form-item prop="oldPassword"
                            label="Current Password">
                <el-input v-model="formData.oldPassword"
                          type="password"></el-input>
              </el-form-item>
              <el-form-item prop="newPassword"
                            label="New Password">
                <el-input v-model="formData.newPassword"
                          type="password"></el-input>
              </el-form-item>
              <el-form-item prop="rePassword"
                            label="Re-Enter New Password">
                <el-input v-model="formData.rePassword"
                          type="password"></el-input>
              </el-form-item>
              <div class="form-bar">
                <el-button @click="changePasswordFn"
                           class="btn-submit grey">Save</el-button>
              </div>
            </el-form>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import store from '@/stores'
import TabList from '@/components/TabList.vue'
import request from '@/utils/request'
export default {
  components: {
    TabList
  },
  setup() {
    const formData = reactive({
      newPassword: '',
      oldPassword: '',
      rePassword: '',
      userId: ''
    })
    const router = useRouter()
    const ruleForm = ref(null)
    const rules = {
      oldPassword: [{ required: true, message: 'Old password is required.', trigger: 'blur' }, { min: 6, message: 'Old password length incorrect.', trigger: 'change' }],
      newPassword: [{ required: true, message: 'New password is required.', trigger: 'blur' }, { min: 6, message: 'New password length incorrect.', trigger: 'change' }],
      rePassword: [{ required: true, message: 'Re password is required.', trigger: 'blur' }, { min: 6, message: 'Re password length incorrect.', trigger: 'change' }]
    }
    const changePasswordFn = async () => {
      const url = `/private/auth/change/password`,
        data = { ...formData }
      ruleForm.value.validate(valid => {
        if (valid) {
          if (formData.newPassword !== formData.rePassword) {
            ElMessage({
              type: 'error',
              message: 'Two inconsistent new passwords',
              duration: 2500
            })
            return
          }
          request.post(url, data).then(({ data }) => {
            if (data) {
              ElMessage({
                type: 'success',
                message: 'Reset password successfully, please re-login.'
              })
              store.commit('LOGIN_OUT')
              setTimeout(() => {
                router.push({
                  path: '/login'
                })
              }, 2000)
            }
          })
        }
      })
    }
    return {
      formData,
      changePasswordFn,
      rules,
      ruleForm
    }
  }
}
</script>

