<template>
  <div>
    <el-dialog :title="surveyName"
               :visible="show"
               @close="$emit('close')"
               :before-close="rejectSurvey"
               :show-close="!eMandatory"
               :close-on-click-modal="false">
      <div class="page-form">
        <el-form :model="ruleForm"
                 ref="ruleForm">
          <div class="sub-title">
            <span style="color:#dd1037">*</span>Indicates that this question is required.
          </div>
          <div v-for="(item, index) in questionsList"
               :key="item.order">
            <el-form-item>
              <template slot="label"><span style="color:#dd1037">*</span>{{item.code}}. {{item.name}}</template>
            </el-form-item>

            <el-form-item v-if="item.questionType === 'Single_Choice'"
                          :prop="`questionsList.${index}.answerList.0.id`"
                          :rules="{required: true, message: 'Please choose one option.', trigger: 'change'}">
              <el-radio-group style="display: block;"
                              v-model="ruleForm.questionsList[index].answerList[0].id">
                <el-row :gutter="15">
                  <el-col>
                    <div v-for="child in item.answerList"
                         :key="child.order">
                      <el-radio :label="child.id">{{child.code}} .{{child.name}}</el-radio>
                      <div v-if="child.needSpecify && ruleForm.questionsList[index].answerList[0].id == child.id">
                        <el-form-item :prop="`questionsList.${index}.answerList.0.specifyContent`"
                                      :rules="{required: true, message: 'Please enter the details.', trigger: 'blur'}">
                          <el-input v-model="ruleForm.questionsList[index].answerList[0].specifyContent"
                                    type="textarea"></el-input>
                        </el-form-item>
                      </div>
                    </div>
                  </el-col>
                </el-row>
              </el-radio-group>
            </el-form-item>

            <el-row :gutter="15"
                    v-else-if="item.questionType === 'Multiple_Choice'">

              <el-form-item :prop="`questionsList.${index}.answerList`"
                            :rules="[{type: 'array', required: true, message: 'Please choose at least one option.',trigger: 'change'}, {validator: validateCheckbox,trigger: 'change'}]">
                <el-col>
                  <div v-for="(child , childIndex) in item.answerList"
                       :key="child.order">
                    <el-checkbox :true-label="child.id"
                                 v-model="ruleForm.questionsList[index].answerList[childIndex].id"
                                 :label="child.id">{{child.code}} . {{child.name}}</el-checkbox>
                    <div v-if="child.needSpecify && ruleForm.questionsList[index].answerList[childIndex].id == child.id">
                      <el-form-item :prop="`questionsList.${index}.answerList.${childIndex}.specifyContent`"
                                    :rules="{required: true, message: 'Please enter the details.', trigger: 'blur'}">
                        <el-input v-model="ruleForm.questionsList[index].answerList[childIndex].specifyContent"
                                  type="textarea"></el-input>
                      </el-form-item>
                    </div>
                  </div>
                </el-col>
              </el-form-item>
            </el-row>
            <el-form-item v-else
                          :prop="`questionsList.${index}.shortAnswerContent`"
                          :rules="{required: true, message: 'Please answer the question.', trigger: 'blur'}">
              <el-input v-model="ruleForm.questionsList[index].shortAnswerContent"
                        type="textarea"></el-input>
            </el-form-item>

          </div>
        </el-form>
      </div>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="rejectSurvey"
                   v-if="!eMandatory">Cancel</el-button>
        <el-button type="primary"
                   @click="modifySubmit">Submit</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'surveyDialog',
  props: ['id', 'visible', 'mandatory'],
  data() {
    return {
      show: this.visible,
      queryId: this.id,
      eMandatory: this.mandatory,
      ruleForm: {
        surveyId: null,
        questionsList: []
      },
      questionsList: null,
      surveyName: null
    }
  },
  computed: {
    computeTitle() {
      const count = sessionStorage.getItem('surveyCount')
      return 'Student Survey ' + [...' ⅠⅡⅢⅣⅤⅥⅦⅧⅨⅩ'][count]
    }
  },
  methods: {
    validateCheckbox(rule, value, callback) {
      if (value && !value.some(e => (e.id))) {
        callback(new Error('Please choose at least one option.'))
      } else {
        callback()
      }
      callback()
    },
    getList() {
      const url = `student/survey/view/${this.queryId}`
      const _ = this
      const cache = []
      this.$http.post(url, {}).then(res => {
        console.log('Query Survey Detail')
        this.questionsList = res.questionsList
        this.surveyName = res.name
        if (res.questionsList && res.questionsList.length > 0) {
          res.questionsList.map((v, index) => {
            cache.push(v.questionType !== 'Short_Answer' ? {
              id: v.id,
              answerList: v.answerList ? [...v.answerList].map((e, { id }) => {
                if (e.needSpecify) {
                  return {
                    id: null,
                    specifyContent: null
                  }
                } else {
                  return { id: null }
                }
              }) : []
            } : {
                id: v.id,
                answerList: v.answerList ? [...v.answerList].map((e, { id }) => {
                  if (e.needSpecify) {
                    return {
                      id: null,
                      specifyContent: null
                    }
                  } else {
                    return { id: null }
                  }
                }) : [],
                shortAnswerContent: null
              })
          })
          _.ruleForm.questionsList = cache
        }
      }).catch(err => {
        console.log('Query Data Faild.', err)
      })
    },
    rejectSurvey() {
      if (this.eMandatory) return
      else {
        const url = `/student/survey/reject/${this.queryId}`
        this.$confirm(`Are you sure to close the survey and refuse to answer these questions?`, 'Caution', {
          cancelButtonText: 'No',
          confirmButtonText: 'Yes',

        }).then(() => {
          this.$http.post(url, {}).then(res => {
            this.$emit('handleUpdate', true)
            this.$emit('close')
          }).catch(err => {
            console.log('Close Faild.', err)
          })
        }).catch(err => {
          console.log('Cancel to close survey.')
        })
      }
    },
    modifySubmit() {
      const url = `/student/survey/submit`
      const deepData = JSON.parse(JSON.stringify(this.ruleForm.questionsList))
      deepData.forEach((v, index) => {
        v.answerList = v.answerList.filter(ev => (ev.id !== null && ev.id))
      })
      const params = {
        surveyId: this.queryId,
        questionsList: deepData
      }
      this.$refs['ruleForm'].validate(valid => {
        if (valid) {
          this.$http.post(url, params).then(res => {
            console.log('Submit success')
            this.$message.success('success')
            this.$emit('handleUpdate', true)
            this.$emit('close', true)
          }).catch(err => {
            console.log('Submit Survey Faild.', err)
          })
        } else {
          console.log('Valid Survey Form Faild.')
        }
      })
    }
  },
  created() {
    this.getList()
  },
  watch: {
    show(val) {
      this.show = this.visible
    },
    queryId(val) {
      this.queryId = this.id
    },
    eMandatory(val) {
      this.eMandatory = this.mandatory
    }
  }
}
</script>

<style lang="scss" scoped>
.dialog-footer {
  text-align: center;
}
.el-row {
  margin-left: 0 !important;
  margin-right: 0 !important;
}
.sub-title {
  height: 30px;
  line-height: 30px;
  padding-left: 5px;
}
</style>
