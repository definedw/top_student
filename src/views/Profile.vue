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
                             :disabled="true">I declare that I understand I am required to provide a Unique Student Identifier (USI) to the institute. I understand that when I obtain my visa, I will
                  apply for a USI through the Australian Government website and submit the USI to IMC within 14 days upon my arrival in Australia.</el-checkbox>
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
                        label="Telephone Number">
            <el-input v-model="formData.student.mobileNumber"
                      readonly></el-input>
          </el-form-item>
          <el-form-item prop="formData.student.homeNumber"
                        label="Home Number">
            <el-input v-model="formData.student.homeNumber"
                      readonly></el-input>
          </el-form-item>
          <el-form-item prop="formData.student.workNumber"
                        label="(work)Telephone">
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

        </el-form>

      </div>

      <!--myProfileBtnBox-->
      <div class="myProfileContent">
        <div class="myProfileLift">
          <div class="personal">
            <div class="title">Personal Information</div>
            <div class="itemList">
              <field-input type="text"
                           name="title"
                           placeholder=""
                           v-model="myProfile.student.titleName"
                           :disabled="true"
                           label="Title" />
            </div>
            <div class="itemList">
              <field-input type="text"
                           name="firstGivenName"
                           v-model="myProfile.student.firstGivenName"
                           :disabled="true"
                           label="First Given Name" />
            </div>
            <div class="itemList">
              <field-input type="text"
                           name="familyName"
                           :disabled="true"
                           v-model="myProfile.student.familyName"
                           label="Family Name" />
            </div>
            <div class="itemList">
              <field-input type="text"
                           name="otherGivenName"
                           :disabled="true"
                           v-model="myProfile.student.secondGivenName"
                           label="Other Given Name/s" />
            </div>
            <div class="itemList">
              <field-input type="text"
                           name="gender"
                           :disabled="true"
                           v-model="myProfile.student.genderName"
                           v-validate="'required|max:50'"
                           data-vv-as="Gender"
                           label="Gender" />
            </div>
            <div class="itemList">
              <field-input type="text"
                           name="dateOfBirth"
                           :disabled="true"
                           v-model="myProfile.student.birthDate"
                           label="Date of Birth" />
            </div>
            <div class="itemList">
              <field-input type="text"
                           name="Country of Birth"
                           :disabled="true"
                           v-model="myProfile.student.birthCountryIdName"
                           label="Country of Birth" />
            </div>
            <div class="itemList"
                 v-if="computeUsiRequired">
              <field-input type="text"
                           name="Are you currently studying"
                           :disabled="true"
                           v-model="myProfile.student.currentlyStudyingName"
                           label="Are you currently studying" />
            </div>
            <div class="itemList"
                 v-if="">

            </div>
            <div class="itemList"
                 v-if="computeUsiRequired && myProfile.student.currentlyStudyingName == 'Onshore in Australia'">

              <field-input type="text"
                           name="Unique Student Identifier"
                           :disabled="true"
                           v-model="myProfile.student.studentUsi"
                           label="Unique Student Identifier" />

            </div>
          </div>
          <div class="culturalBackground">
            <div class="title">Cultural Background</div>
            <div class="itemList">
              <field-input type="text"
                           name="Student Category"
                           :disabled="true"
                           v-model="myProfile.student.internationalStudentT"
                           label="Student Category" />
            </div>
            <div v-if="!myProfile.student.internationalStudent">
              <div class="title">Financial Related</div>
              <div class="itemList">
                <field-input type="text"
                             name="Assistance Type"
                             :disabled="true"
                             v-model="myProfile.student.feeHelp"
                             label="Assistance Type" />
              </div>
              <div class="itemList">
                <field-input type="text"
                             name="Tax File Number"
                             :disabled="true"
                             v-model="myProfile.student.taxFileNumber"
                             label="Tax File Number" />
              </div>
            </div>
          </div>
          <div class="contactDetails">
            <div class="title">Contact Details</div>
            <div class="itemList">
              <field-input type="text"
                           name="Personal Email"
                           :disabled="true"
                           v-model="myProfile.student.email1"
                           label="Personal Email" />
            </div>
            <div class="itemList">
              <field-input type="text"
                           name="Mobile"
                           :disabled="true"
                           v-model="myProfile.student.mobileNumber"
                           label="Mobile" />
            </div>
            <div class="itemList">
              <field-input type="text"
                           name="Telephone"
                           :disabled="true"
                           v-model="myProfile.student.homeNumber"
                           label="Telephone(Home)" />
            </div>
            <div class="itemList">
              <field-input type="text"
                           name="Telephone(Work)"
                           :disabled="true"
                           v-model="myProfile.student.workNumber"
                           label="Telephone(Work)" />
            </div>
          </div>
          <div class="localAddress">
            <div class="title">Local Address</div>
            <div class="itemList">
              <field-input type="text"
                           name="Country"
                           :disabled="true"
                           v-model="myProfile.Local_Address.countryIdName"
                           label="Country" />
            </div>
            <div class="itemList">
              <field-input type="text"
                           name="State or Territory"
                           :disabled="true"
                           v-model="myProfile.Local_Address.stateIdName"
                           label="State or Territory" />
            </div>
            <div class="itemList">
              <field-input type="text"
                           name="Suburb or City"
                           :disabled="true"
                           v-model="myProfile.Local_Address.suburb"
                           label="Suburb or City" />
            </div>
            <div class="itemList">
              <field-input type="text"
                           name="Street Address 1"
                           :disabled="true"
                           v-model="myProfile.Local_Address.streetLine1"
                           label="Street Address 1" />
            </div>
            <div class="itemList">
              <field-input type="text"
                           name="Street Address 2"
                           :disabled="true"
                           v-model="myProfile.Local_Address.streetLine2"
                           label="Street Address 2" />
            </div>
            <div class="itemList">
              <field-input type="text"
                           name="Postcode"
                           :disabled="true"
                           v-model="myProfile.Local_Address.postcode"
                           label="Postcode" />
            </div>
          </div>
          <div v-if="myProfile.student.internationalStudent">
            <div class="title">International Address</div>
            <div class="itemList">
              <field-input type="text"
                           name="Country"
                           :disabled="true"
                           v-model="myProfile.International_Address.countryIdName"
                           label="Country" />
            </div>
            <div class="itemList">
              <field-input type="text"
                           name="Suburb or City"
                           :disabled="true"
                           v-model="myProfile.International_Address.suburb"
                           label="Suburb or City" />
            </div>
            <div class="itemList">
              <field-input type="text"
                           name="Street Address 1"
                           :disabled="true"
                           v-model="myProfile.International_Address.streetLine1"
                           label="Street Address 1" />
            </div>
            <div class="itemList">
              <field-input type="text"
                           name="Street Address 2"
                           :disabled="true"
                           v-model="myProfile.International_Address.streetLine2"
                           label="Street Address 2" />
            </div>
            <div class="itemList">
              <field-input type="text"
                           name="Postcode"
                           :disabled="true"
                           v-model="myProfile.International_Address.postcode"
                           label="Postcode" />
            </div>
          </div>
          <div class="specialCircumstances">
            <div class="title">Special Circumstances</div>
            <div class="itemList">
              <field-input type="text"
                           name="Have any disability which may affect studies"
                           :disabled="true"
                           v-model="myProfile.student.disabilityTypeT"
                           label="Have any disability which may affect studies" />
            </div>
            <div class="itemList"
                 v-if="myProfile.student.assistanceDisabilityServices">
              <div data-v-88ec899a=""
                   class="form-row field-container"
                   aria-invalid="false">
                <div class="label-control">
                  <label>Disability Type</label>
                </div>
                <div class="form-cont">
                  <div class="form-group filled">
                    <el-checkbox-group class="checkbox-group"
                                       v-model="myProfile.student.disabilityType">
                      <el-checkbox v-for="(item, index) in myProfile.disabilityTypeDict"
                                   :key="index"
                                   :value="item.id"
                                   :disabled="true"
                                   :label="item.id">{{ item.name }}</el-checkbox>
                    </el-checkbox-group>
                  </div>
                </div>
              </div>

            </div>
            <div class="itemList"
                 v-if="myProfile.student.assistanceDisabilityServices">
              <field-input type="text"
                           name="Willing to receive advice on support services, equipment and facilities"
                           :disabled="true"
                           :value="myProfile.student.receiveAdviceOnDisabilityServices?'Yes':'No'"
                           label="Willing to receive advice on support services, equipment and facilities" />
              <div>
                <field-input type="text"
                             :disabled="true"
                             v-model="myProfile.student.disabilityDescribe"
                             label="Please indicate if you need any special assistance" />
              </div>

            </div>
          </div>
        </div>
        <div class="myProfileRight">

          <div class="emergencyContact">
            <div class="title">Emergency Contact</div>
            <div class="itemList">
              <field-input type="text"
                           name="Title"
                           :disabled="true"
                           v-model="myProfile.contact.titleName"
                           label="Title" />
            </div>
            <div class="itemList">
              <field-input type="text"
                           name="First Given Name"
                           :disabled="true"
                           v-model="myProfile.contact.firstGivenName"
                           label="First Given Name" />
            </div>
            <div class="itemList">
              <field-input type="text"
                           name="Family Name"
                           :disabled="true"
                           v-model="myProfile.contact.familyName"
                           label="Family Name" />
            </div>
            <div class="itemList">
              <field-input type="text"
                           name="Relationship"
                           :disabled="true"
                           v-model="myProfile.contact.relationship"
                           label="Relationship" />
            </div>
            <div class="itemList">
              <field-input type="text"
                           name="Mobile"
                           :disabled="true"
                           v-model="myProfile.contact.mobileNumber"
                           label="Mobile" />
            </div>
            <div class="itemList">
              <field-input type="text"
                           name="Telephone (Home)"
                           :disabled="true"
                           v-model="myProfile.contact.homeNumber"
                           label="Telephone (Home)" />
            </div>
            <div class="itemList">
              <field-input type="text"
                           name="Telephone (Work)"
                           :disabled="true"
                           v-model="myProfile.contact.workNumber"
                           label="Telephone (Work)" />
            </div>
            <div class="itemList">
              <field-input type="text"
                           name="Country"
                           :disabled="true"
                           v-model="myProfile.contact.countryName"
                           label="Country" />
            </div>
            <div class="itemList">
              <field-input type="text"
                           name="State or Territory"
                           :disabled="true"
                           v-model="myProfile.contact.stateName"
                           label="State or Territory" />
            </div>
            <div class="itemList">
              <field-input type="text"
                           name="Suburb or City"
                           :disabled="true"
                           v-model="myProfile.contact.suburb"
                           label="Suburb or City" />
            </div>
            <div class="itemList">
              <field-input type="text"
                           name="Street Address 1"
                           :disabled="true"
                           v-model="myProfile.contact.streetLine1"
                           label="Street Address 1" />
            </div>
            <div class="itemList">
              <field-input type="text"
                           name="Street Address 2"
                           :disabled="true"
                           v-model="myProfile.contact.streetLine2"
                           label="Street Address 2" />
            </div>
            <div class="itemList">
              <field-input type="text"
                           name="Postcode"
                           :disabled="true"
                           v-model="myProfile.contact.postcode"
                           label="Postcode" />
            </div>
            <div class="itemList">
              <field-input type="text"
                           name="Copy all communication"
                           :disabled="true"
                           v-model="myProfile.contact.communication"
                           label="Copy all communication" />
            </div>
          </div>

        </div>
        <div class="emergencyContact">
          <div class="title">Others</div>
          <div class="itemList">
            <field-input type="text"
                         name="Highest educational attainment of parent 1"
                         :disabled="true"
                         v-model="myProfile.student.educationalParent1Name"
                         label="Highest educational attainment of parent 1" />
          </div>
          <div class="itemList">
            <field-input type="text"
                         name="Highest educational attainment of parent 2"
                         :disabled="true"
                         v-model="myProfile.student.educationalParent2Name"
                         label="Highest educational attainment of parent 2" />
          </div>
        </div>
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
