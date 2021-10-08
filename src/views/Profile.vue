<template>
  <div class="page-inner">
    <TabList main-name="My Profile"
             main-url="/profile"></TabList>
    <div class="card"
         v-show="visible"
         style="padding: 15px">
      <div class="page-form">
        <el-form model="formData"
                 ref="ruleForm"
                 label-width="auto"
                 :rules="rules">
          <div class="myProfileBtnBox"
               style="margin-left:-15px;margin-right:-15px;padding:0 15px 15px;">
            <el-button :type="formData.confirmed ? 'info' : 'danger'"
                       :disabled="formData.confirmed"
                       class="cur"
                       @click="confirmedFn">Confirm Information</el-button>
            <el-button @click="$router.push('/home/modifyProfile')">Edit Information</el-button>
          </div>
          <div class="dangerTip"
               v-if="!formData.confirmed">
            <el-alert title='Notice: Please confirm the following information is correct, or you cannot be permitted to do any actions.'
                      :closable="false"
                      type="warning"
                      show-icon>
            </el-alert>
          </div>

          <div class="content-title title">Personal Information</div>
          <el-form-item prop="formData.student.titleName"
                        label="Title">
            <el-input v-model="formData.student.titleName"
                      readonly></el-input>
          </el-form-item>
          <el-form-item prop="formData.student.firstGivenName"
                        label="First Given Name">
            <el-input v-model="formData.student.firstGivenName"
                      readonly></el-input>
          </el-form-item>
          <el-form-item prop="formData.student.familyName"
                        label="Family Name">
            <el-input v-model="formData.student.familyName"
                      readonly></el-input>
          </el-form-item>
          <el-form-item prop="formData.student.secondGivenName"
                        label="Second Given Name">
            <el-input v-model="formData.student.secondGivenName"
                      readonly></el-input>
          </el-form-item>
          <el-form-item prop="formData.student.genderName"
                        label="Gender Name">
            <el-input v-model="formData.student.genderName"
                      readonly></el-input>
          </el-form-item>
          <el-form-item prop="formData.student.birthDate"
                        label="Date of Birth">
            <el-input v-model="formData.student.birthDate"
                      readonly></el-input>
          </el-form-item>
          <el-form-item prop="formData.student.birthCountryIdName"
                        label="Country of Birth">
            <el-input v-model="formData.student.birthCountryIdName"
                      readonly></el-input>
          </el-form-item>
          <el-form-item v-if="computeUsiRequired"
                        prop="formData.student.currentlyStudyingName"
                        label="Are you currently studying">
            <el-input v-model="formData.student.currentlyStudyingName"
                      readonly></el-input>
          </el-form-item>
          <el-form-item prop="formData.student.birthCountryIdName"
                        label="Country of Birth">
            <el-input v-model="formData.student.birthCountryIdName"
                      readonly></el-input>
          </el-form-item>
          <el-form-item v-if="computeUsiRequired && formData.student.currentlyStudyingName == 'Offshore/Overseas'"
                        label=""
                        prop="declareProvideUsi">
            <el-row :gutter="8">
              <el-col :span="12"
                      :push="8"
                      :pull="4">
                <el-checkbox class="form-checkbox__label"
                             v-model="formData.student.declareProvideUsi"
                             :disabled="true">I declare that I understand I am required to provide a Unique Student Identifier (USI) to the institute.
                  I understand that when I obtain my visa, I will
                  apply for a USI through the Australian Government website and submit the USI to IMC within 14 days upon my arrival in Australia.
                </el-checkbox>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item prop="formData.student.studentUsi"
                        label="Student USI">
            <el-input v-model="formData.student.studentUsi"
                      readonly></el-input>
          </el-form-item>

          <div class="content-title title">Cultural Background</div>

          <el-form-item prop="formData.student.internationalStudentT"
                        label="Student Category">
            <el-input v-model="formData.student.internationalStudentT"
                      readonly></el-input>
          </el-form-item>
          <el-form-item v-if="!formData.student.internationalStudent"
                        prop="formData.student.internationalStudent"
                        label="Student Category">
            <el-input v-model="formData.student.internationalStudent"
                      readonly></el-input>
          </el-form-item>
          <div v-if="formData.sutdent.intenationalStudent">
            <div class="content-title title">Financial Related</div>
            <el-form-item prop="formData.student.feeHelp"
                          label="Assistance Type">
              <el-input v-model="formData.student.feeHelp"
                        readonly></el-input>
            </el-form-item>
            <el-form-item prop="formData.student.taxFileNumber"
                          label="Tax File Number">
              <el-input v-model="formData.student.taxFileNumber"
                        readonly></el-input>
            </el-form-item>
          </div>
          <div class="content-title title">Contact Details</div>
          <el-form-item prop="formData.student.email"
                        label="Email Address">
            <el-input v-model="formData.student.email"
                      readonly></el-input>
          </el-form-item>
          <el-form-item prop="formData.student.mobileNumber"
                        label="Telephone">
            <el-input v-model="formData.student.mobileNumber"
                      readonly></el-input>
          </el-form-item>
          <el-form-item prop="formData.student.homeNumber"
                        label="Telephone (home)">
            <el-input v-model="formData.student.homeNumber"
                      readonly></el-input>
          </el-form-item>
          <el-form-item prop="formData.student.workNumber"
                        label="Telephone (work)">
            <el-input v-model="formData.student.workNumber"
                      readonly></el-input>
          </el-form-item>
          <div class="content-title title">Local Address</div>
          <el-form-item prop="formData.Local_Address.birthCountryIdName"
                        label="Country">
            <el-input v-model="formData.Local_Address.birthCountryIdName"
                      readonly></el-input>
          </el-form-item>
          <el-form-item prop="formData.Local_Address.stateIdName"
                        label="State or Territory">
            <el-input v-model="formData.Local_Address.stateIdName"
                      readonly></el-input>
          </el-form-item>
          <el-form-item prop="formData.Local_Address.suburb"
                        label="Suburb or City">
            <el-input v-model="formData.Local_Address.suburb"
                      readonly></el-input>
          </el-form-item>
          <el-form-item prop="formData.Local_Address.streetLine1"
                        label="Street Address 1">
            <el-input v-model="formData.Local_Address.streetLine1"
                      readonly></el-input>
          </el-form-item>
          <el-form-item prop="formData.Local_Address.streetLine2"
                        label="Street Address 2">
            <el-input v-model="formData.Local_Address.streetLine2"
                      readonly></el-input>
          </el-form-item>
          <el-form-item prop="formData.Local_Address.postcode"
                        label="Postcode">
            <el-input v-model="formData.Local_Address.postcode"
                      readonly></el-input>
          </el-form-item>
          <div v-if="formData.student.internationalStudent">
            <div class="content-title title">International Address</div>
            <el-form-item prop="formData.International_Address.birthCountryIdName"
                          label="Country">
              <el-input v-model="formData.International_Address.birthCountryIdName"
                        readonly></el-input>
            </el-form-item>
            <el-form-item prop="formData.International_Address.stateIdName"
                          label="State or Territory">
              <el-input v-model="formData.International_Address.stateIdName"
                        readonly></el-input>
            </el-form-item>
            <el-form-item prop="formData.International_Address.suburb"
                          label="Suburb or City">
              <el-input v-model="formData.International_Address.suburb"
                        readonly></el-input>
            </el-form-item>
            <el-form-item prop="formData.International_Address.streetLine1"
                          label="Street Address 1">
              <el-input v-model="formData.International_Address.streetLine1"
                        readonly></el-input>
            </el-form-item>
            <el-form-item prop="formData.International_Address.streetLine2"
                          label="Street Address 2">
              <el-input v-model="formData.International_Address.streetLine2"
                        readonly></el-input>
            </el-form-item>
            <el-form-item prop="formData.International_Address.postcode"
                          label="Postcode">
              <el-input v-model="formData.International_Address.postcode"
                        readonly></el-input>
            </el-form-item>
          </div>
          <div class="content-title title">Special Circumstances</div>
          <el-form-item prop="formData.student.disabilityTypeT"
                        label="Have any disability which may affect studies">
            <el-input v-model="formData.student.postcode"
                      readonly></el-input>
          </el-form-item>
          <el-form-item v-if="formData.student.assistanceDisabilityServices"
                        prop="formData.student.disabilityType"
                        label="Disability Type">
            <el-checkbox-group class="checkbox-group"
                               v-model="formData.student.disabilityType">
              <el-checkbox v-for="(item, index) in formData.disabilityTypeDict"
                           :key="index"
                           :value="item.id"
                           :disabled="true"
                           :label="item.id">{{ item.name }}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>

          <el-form-item v-if="formData.student.assistanceDisabilityServices"
                        label="Willing to receive advice on support services, equipment and facilities"
                        prop="formData.student.assistanceDisabilityServices">
            <el-input :value="formData.student.assistanceDisabilityServices ? 'Yes' : 'No'"
                      readonly></el-input>
          </el-form-item>
          <el-form-item v-if="formData.student.assistanceDisabilityServices"
                        label="Please indicate if you need any special assistance"
                        prop="formData.student.disabilityDescribe">
            <el-input :value="formData.student.disabilityDescribe ? 'Yes' : 'No'"
                      readonly></el-input>
          </el-form-item>

          <div class="content-title title">Emergency Contact</div>
          <el-form-item label="Title"
                        prop="formData.contact.titleName">
            <el-input v-model="formData.contact.titleName"
                      readonly></el-input>
          </el-form-item>
          <el-form-item label="First Given Name"
                        prop="formData.contact.firstGivenName">
            <el-input v-model="formData.contact.firstGivenName"
                      readonly></el-input>
          </el-form-item>
          <el-form-item label="Family Name"
                        prop="formData.contact.familyName">
            <el-input v-model="formData.contact.familyName"
                      readonly></el-input>
          </el-form-item>
          <el-form-item label="Relationship"
                        prop="formData.contact.relationship">
            <el-input v-model="formData.contact.relationship"
                      readonly></el-input>
          </el-form-item>
          <el-form-item label="Telephone"
                        prop="formData.contact.mobileNumber">
            <el-input v-model="formData.contact.mobileNumber"
                      readonly></el-input>
          </el-form-item>
          <el-form-item label="Telephone (home)"
                        prop="formData.contact.homeNumber">
            <el-input v-model="formData.contact.homeNumber"
                      readonly></el-input>
          </el-form-item>
          <el-form-item label="Telephone (work)"
                        prop="formData.contact.workNumber">
            <el-input v-model="formData.contact.workNumber"
                      readonly></el-input>
          </el-form-item>
          <el-form-item label="Country"
                        prop="formData.contact.countryName">
            <el-input v-model="formData.contact.countryName"
                      readonly></el-input>
          </el-form-item>
          <el-form-item label="State or Territory"
                        prop="formData.contact.stateName">
            <el-input v-model="formData.contact.stateName"
                      readonly></el-input>
          </el-form-item>
          <el-form-item label="Suburb of City"
                        prop="formData.contact.suburb">
            <el-input v-model="formData.contact.suburb"
                      readonly></el-input>
          </el-form-item>
          <el-form-item label="Street Address 1"
                        prop="formData.contact.streetLine1">
            <el-input v-model="formData.contact.streetLine1"
                      readonly></el-input>
          </el-form-item>
          <el-form-item label="Street Address 2"
                        prop="formData.contact.streetLine2">
            <el-input v-model="formData.contact.streetLine2"
                      readonly></el-input>
          </el-form-item>
          <el-form-item label="Postcode"
                        prop="formData.contact.postcode">
            <el-input v-model="formData.contact.postcode"
                      readonly></el-input>
          </el-form-item>
          <el-form-item label="Copy all communication"
                        prop="formData.contact.communication">
            <el-input v-model="formData.contact.communication"
                      readonly></el-input>
          </el-form-item>
          <div class="content-title title">Others</div>
          <el-form-item label="Highest educational attainment of parent 1"
                        prop="formData.student.educationalParent1Name">
            <el-input v-model="formData.student.educationalParent1Name"></el-input>
          </el-form-item>
          <el-form-item label="Highest educational attainment of parent 2"
                        prop="formData.student.educationalParent2Name">
            <el-input v-model="formData.student.educationalParent2Name"></el-input>
          </el-form-item>

        </el-form>

      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import store from '@/stores'
import TabList from '@/components/TabList.vue'

import request from '@/utils/request'

export default {
  components: { TabList },
  setup() {
    const formData = reactive({
      student: {
        titleName: ''
      },
      contact: {
        titleName: '',
        firstGivenName: '',
        communication: ''
      },
      Local_Address: {},
      International_Address: {},
      addressList: [],
    })
    const ruleForm = ref(null)
    const visible = ref(false)
    const internationalStudent = computed(() => {
      return store.userInfo.student.internationalStudent
    })
    const currentCourseType = computed(() => {
      return store.state.currentCourseType
    })
    const rules = {
      'student.titleName': [{ required: true, message: 'Title Name is required.', trigger: 'blur' }],
      'student.firstGivenName': [{ required: true, message: 'First Given Name is required.', trigger: 'blur' }],
      'student.familyName': [{ required: true, message: 'Family Name is required.', trigger: 'blur' }],
      'student.relationship': [{ required: true, message: 'Relationship is required.', trigger: 'blur' }],
      'student.mobileNumber': [{ required: true, message: 'Telephone Number is required.', trigger: 'blur' }],
      'student.countryName': [{ required: true, message: 'Country Name is required.', trigger: 'blur' }],
      'student.suburb': [{ required: true, message: 'Suburb or City is required.', trigger: 'blur' }],
      'student.currentlyStudyingName': [{ required: computeUsiRequired ? true : false, message: 'Currently Studying Name is required.', trigger: 'blur' }],
      'student.studentUsi': [{ required: formData.student.currentlyStudyingName && formData.student.currentlyStudyingName == 'Onshore in Australia' ? true : false, message: 'Currently Studying Name is required.', trigger: 'blur' }, { min: 10, message: 'Student Usi length is invalid.', trigger: 'change' }],
      'contact.titleName': [{ required: true, message: 'Title Name is required.', trigger: 'blur' }],
      'contact.firstGivenName': [{ required: true, message: 'First Given Name is required.', trigger: 'blur' }],
      'contact.familyName': [{ required: true, message: 'Family Name is required.', trigger: 'blur' }],
      'contact.relationship': [{ required: true, message: 'Relationship is required.', trigger: 'blur' }],
      'contact.mobileNumber': [{ required: true, message: 'Telephone Number is required.', trigger: 'blur' }],
      'contact.countryName': [{ required: true, message: 'Country Name is required.', trigger: 'blur' }],
      'contact.suburb': [{ required: true, message: 'Suburb or City is required.', trigger: 'blur' }],
      'contact.postcode': [{ required: true, message: 'Postcode is required.', trigger: 'blur' }, { min: 4, max: 10, message: 'Postcode length is invalid.', trigger: 'change' }],
      'Local_Address.postcode': [{ required: true, message: 'Postcode is required.', trigger: 'blur' }, { min: 4, max: 10, message: 'Postcode length is invalid.', trigger: 'change' }],
      'International_Address.postcode': [{ required: true, message: 'Postcode is required.', trigger: 'blur' }, { min: 4, max: 10, message: 'Postcode length is invalid.', trigger: 'change' }],

    }
    const router = useRouter()
    const getList = async () => {
      const url = `/student/profile/view`
      request.post(url, {}).then(({ data }) => {
        if (!isArray(data.addressList)) {
          formData.addressList = []
        }
        formData.Local_Address = data.addressList.find(v => v.addressType == 'Local_Address')
        // Domestic Student default setting country id 752 = 'Australia
        formData.Local_Address.countryId = 752
        formData.International_Address = data.addressType.find(v => v.addressType == 'International_Address')
        formData = Object.assign(formData, data)

        if (!formData.contact) {
          formData.contact = {
            titleName: null,
            firstGivenName: null,
            familyName: null,
            relationship: null,
            mobileNumber: null,
            homeNumber: null,
            workNumber: null,
            countryName: null,
            stateName: null,
            suburb: null,
            streetLine1: null,
            streetLine2: null,
            postcode: null,
            communication: null
          }
        }
        if (formData.student) {
          formData.student.feeHelp = formData.student.feeHelp ? 'FEE-HELP' : 'NO FEE-HELP'
          formData.student.student.disabilityTypeT = formData.student.assistanceDisabilityServices ? 'Yes' : 'No'
          formData.contact.communication = formData.contact.communication ? 'Yes' : 'No'
          formData.student.internationalStudentT = formData.student.internationalStudentT ? 'International Student' : 'Domestic Student'
          formData.student.mobileNumber = `${formData.student.mobileNumberCountryCode ? formData.student.mobileNumberCountryCode + '-' : ''}${formData.student.mobileNumber ? formData.student.mobileNumber : ''}`
          formData.student.homeNumber = `${formData.student.homeNumberCountryCode ? formData.student.homeNumberCountryCode + '-' : ''}${formData.student.homeNumberAreaCode ? formData.student.homeNumberAreaCode + '-' : ''}${formData.student.homeNumber ? formData.student.homeNumber : ''}
          `
          formData.student.workNumber = `${formData.student.workNumberCountryCode ? formData.student.workNumberCountryCode + '-' : ''}${formData.student.workNumberAreaCode ? formData.student.workNumberAreaCode + '-' : ''}${formData.student.workNumber ? formData.student.workNumber : ''}
          `
        }
        if (formData.contact) {
          formData.contact.mobileNumber = `${formData.contact.mobileNumberCountryCode ? formData.contact.mobileNumberCountryCode + '-' : ''}${formData.contact.mobileNumber ? formData.contact.mobileNumber : ''}`

          formData.contact.homeNumber = `${formData.contact.homeNumberCountryCode ? formData.contact.homeNumberCountryCode + '-' : ''}${formData.contact.homeNumberAreaCode ? formData.contact.homeNumberAreaCode + '-' : ''}${formData.contact.homeNumber ? formData.contact.homeNumber : ''}`

          formData.contact.workNumber = `${formData.contact.workNumberCountryCode ? formData.contact.workNumberCountryCode + '-' : ''}${formData.contact.workNumberAreaCode ? formData.contact.workNumberAreaCode + '-' : ''}${formData.contact.workNumber ? formData.contact.workNumber : ''}`
        }
        if (formData.student.birthDate) {
          formData.student.birthDate =
            formData.student.birthDate.substring(0, 10)

        }
        visible.value = true
      })
    }
    const confirmedFn = () => {
      const url = `/student/profile/confirm`
      if (formData.confirmed) return
      else {
        ruleForm.value.validate(valid => {
          if (valid) {
            request.get(url).then(res => {
              ElMessage({
                type: 'success',
                message: 'Confirmed Success.'
              })
              setTimeout(() => {
                formData.confirmed = true
                router.push('/home')
              }, 2000)
            })
          }
        })
      }
    }
    const computeUsiRequired = computed(() => {
      if (currentCourseType === 'Non_award_units' || currentCourseType === 'Accounting_Professional_Year_Program') {
        return false
      } else {
        return true
      }
    })
    onMounted(() => {
      getInfo()
    })
    return {
      formData,
      ruleForm,
      visible,
      computeUsiRequired,
      onMounted,
      getList,
      rules,
      confirmedFn,
      internationalStudent
    }
  }
}
</script>

<style scoped lang="scss">
.myProfile {
  width: 100%;
  height: 100%;
  padding: 20px;
  overflow-x: hidden;
  overflow-y: auto;
  box-sizing: border-box;
  .myProfileBtnBox {
    height: 40px;
    .cur {
      color: #fff !important;
      background: #f56c6c !important;
    }
    .active {
      background: #999 !important;
    }
  }
  .dangerTip {
    color: #333;
    height: 40px;
    font-size: 14px;
    line-height: 40px;
    overflow: hidden;
  }
  .myProfileContent {
    .myProfileLift {
      float: left;
      width: 50%;
    }
    .myProfileRight {
      float: left;
      width: 50%;
    }
    .title {
      color: #000;
      font-size: 25px;
      line-height: 40px;
    }
    .culturalBackground {
      height: 356px;
    }
  }
}
.title {
  margin: 15px 0;
  padding: 0 15px;
  line-height: 40px;
  font-size: 17px;
  background: #eee;
}
</style>
<style>
.checkbox-group .el-checkbox {
  width: 32%;
  min-width: 205px;
}
.el-checkbox__label {
  white-space: normal;
}
.form-checkbox__label .el-checkbox__input {
  vertical-align: top !important;
}
</style>
