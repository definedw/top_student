<template>
  <div class="page-inner">
    <TabList main-name="My Profile"
             main-url="/profile"></TabList>
    <div class="card"
         v-show="state.show"
         style="padding: 15px">
      <div class="page-form">
        <el-form model="formData"
                 ref="ruleForm"
                 label-width="auto"
                 :rules="rules">
          <div class="myProfileBtnBox"
               style="margin-left:-15px;margin-right:-15px;padding:0 15px 15px;">
            <el-button :type="myProfile.confirmed ? 'info' : 'danger'"
                       :disabled="myProfile.confirmed"
                       class="cur"
                       @click="confirmedFn">Confirm Information</el-button>
            <el-button @click="$router.push('/home/modifyProfile')">Edit Information</el-button>
          </div>
          <div class="dangerTip"
               v-if="!state.myProfile.confirmed">
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


import TabList from '@/components/TabList.vue'

var myProfileList = function () {
  ; (this.titleName = null),
    (this.firstGivenName = null),
    (this.familyName = null),
    (this.relationship = null),
    (this.mobileNumber = null),
    (this.homeNumber = null),
    (this.workNumber = null),
    (this.countryName = null),
    (this.stateName = null),
    (this.suburb = null),
    (this.streetLine1 = null),
    (this.streetLine2 = null),
    (this.postcode = null),
    (this.communication = null)
}
export default {
  data() {
    return {
      internationalStudent: this.$auth.user.student.internationalStudent,
      show: false,
      myProfile: {
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
      },
      currentCourseType: sessionStorage.getItem('currentCourseType')
    }
  },
  components: {
    TabList,
    FieldInput
  },
  created() {
    this.getInfo()
  },
  computed: {
    computeUsiRequired() {
      if (this.currentCourseType === 'Non_award_units' || this.currentCourseType === 'Accounting_Professional_Year_Program') {
        return false
      } else {
        return true
      }
    }
  },
  methods: {
    getInfo() {
      this.$http.get('/student/profile/view', {}).then(data => {
        if (!data.addressList) {
          data.addressList = []
        }
        data.Local_Address = data.addressList.find(item => item.addressType == 'Local_Address') || { addressType: 'Local_Address' }
        data.Local_Address.countryId = 752
        data.International_Address = data.addressList.find(item => item.addressType == 'International_Address') || { addressType: 'International_Address' }
        this.myProfile = data

        if (!data.contact) {
          this.myProfile.contact = new myProfileList()
        }
        if (this.myProfile.student) {
          this.myProfile.student.feeHelp = this.myProfile.student.feeHelp
            ? 'FEE-HELP'
            : 'No FEE-HELP'
          this.myProfile.student.disabilityTypeT = this.myProfile.student
            .assistanceDisabilityServices
            ? 'Yes'
            : 'No'

          this.myProfile.contact.communication = this.myProfile.contact
            .communication
            ? 'Yes'
            : 'No'
          this.myProfile.student.internationalStudentT = this.myProfile.student
            .internationalStudent
            ? 'International Student'
            : 'Domestic Student'
          this.myProfile.student.mobileNumber = `${this.myProfile.student.mobileNumberCountryCode ? this.myProfile.student.mobileNumberCountryCode + '-' : ''}${this.myProfile.student.mobileNumber ? this.myProfile.student.mobileNumber : ''}`
          this.myProfile.student.homeNumber = `${this.myProfile.student.homeNumberCountryCode ? this.myProfile.student.homeNumberCountryCode + '-' : ''}${this.myProfile.student.homeNumberAreaCode ? this.myProfile.student.homeNumberAreaCode + '-' : ''}${this.myProfile.student.homeNumber ? this.myProfile.student.homeNumber : ''}
          `
          this.myProfile.student.workNumber = `${this.myProfile.student.workNumberCountryCode ? this.myProfile.student.workNumberCountryCode + '-' : ''}${this.myProfile.student.workNumberAreaCode ? this.myProfile.student.workNumberAreaCode + '-' : ''}${this.myProfile.student.workNumber ? this.myProfile.student.workNumber : ''}
          `
        }
        if (this.myProfile.contact) {
          this.myProfile.contact.mobileNumber = `${this.myProfile.contact.mobileNumberCountryCode ? this.myProfile.contact.mobileNumberCountryCode + '-' : ''}${this.myProfile.contact.mobileNumber ? this.myProfile.contact.mobileNumber : ''}`

          this.myProfile.contact.homeNumber = `${this.myProfile.contact.homeNumberCountryCode ? this.myProfile.contact.homeNumberCountryCode + '-' : ''}${this.myProfile.contact.homeNumberAreaCode ? this.myProfile.contact.homeNumberAreaCode + '-' : ''}${this.myProfile.contact.homeNumber ? this.myProfile.contact.homeNumber : ''}`

          this.myProfile.contact.workNumber = `${this.myProfile.contact.workNumberCountryCode ? this.myProfile.contact.workNumberCountryCode + '-' : ''}${this.myProfile.contact.workNumberAreaCode ? this.myProfile.contact.workNumberAreaCode + '-' : ''}${this.myProfile.contact.workNumber ? this.myProfile.contact.workNumber : ''}`
        }
        if (this.myProfile.student.birthDate) {
          this.myProfile.student.birthDate =
            this.myProfile.student.birthDate.substring(0, 10)

        }
        this.show = true
      })
    },
    getDate(val) {
      if (!val) {
        return ''
      }
      return dataUtils.formatDate(new Date(val), 'dd/MM/yyyy')
    },
    routerPath() {
      this.$router.push('/home/modifyProfile')
    },
    confirmedFn() {
      if (this.myProfile.confirmed) {
        return false
      }
      if (!this.myProfile.contact.titleName ||
        !this.myProfile.contact.firstGivenName ||
        !this.myProfile.contact.familyName ||
        !this.myProfile.contact.relationship ||
        !this.myProfile.contact.mobileNumber ||
        !this.myProfile.contact.countryName ||
        !this.myProfile.contact.suburb ||
        !this.myProfile.contact.streetLine1
      ) {
        this.$message.error('Your profile is incomplete, please edit it.')
      }
      if (this.computeUsiRequired) {
        if (!this.myProfile.student.currentlyStudyingName) {
          this.$message.error('Your profile is incomplete, please edit it.')
          return
        }
        if (this.myProfile.student.currentlyStudyingName && this.myProfile.student.currentlyStudyingName == 'Onshore in Australia') {
          if (!this.myProfile.student.studentUsi || this.myProfile.student.studentUsi.length !== 10) {
            this.$message.error('Your profile is incomplete, please edit it.')
            return
          }
        }
      }
      if (!this.myProfile.Local_Address.postcode || this.myProfile.Local_Address.postcode.length !== 4) {
        this.$message.error('Your profile is incomplete, please edit it.')
        return
      }
      if (this.myProfile.contact.countryName === 'Australia') {
        if (!this.myProfile.contact.postcode || this.myProfile.contact.postcode.length !== 4) {
          this.$message.error('Your profile is incomplete, please edit it.')
          return
        }
      } else {
        if (!this.myProfile.contact.postcode || this.myProfile.contact.postcode.length > 10) {
          this.$message.error('Your profile is incomplete, please edit it.')
          return
        }
      }
      this.$http.get('/student/profile/confirm', {}).then(data => {
        this.$message({
          type: 'success',
          message: 'success'
        })
        setTimeout(() => {
          this.myProfile.confirmed = true
          this.$router.push('/home')
        }, 2000)
      })
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
