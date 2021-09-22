<template>
  <div class="content homePage">
    <div class="home-header">
      <div class="header-bg"></div>
      <div class="student-info"
           style="height: auto">
        <el-row>
          <el-col :xs="24"
                  :md="dataList.offer.status==='Invalid'?24:16"
                  :lg="dataList.offer.status==='Invalid'?24:16"
                  style="height: auto;border: none">
            <div class="my-photo">
              <img :src="dataList.student.photo"
                   alt="My Photo"
                   @error="changeImg($event)" />
            </div>
            <div class="student-type"
                 style="min-width: 195px;">
              <span class="tag"
                    style="margin-bottom: 10px">{{
                dataList.student.internationalStudent
                  ? 'International'
                  : 'Domestic'
              }}</span><span class="tag"
                    v-if="dataList.student.feeHelp">FEE-HELP</span>
            </div>
            <div class="student-id">
              <div class="name">
                <span class="first">{{ dataList.student.firstGivenName }}</span><span class="last">{{ dataList.student.familyName }}</span>
              </div>
              <div class="student-no">
                <span class="label">Student No: </span>{{ dataList.student.studentNum }}
              </div>
            </div>
          </el-col>
          <el-col :xs="dataList.offer.status==='Invalid'?0:24"
                  :md="dataList.offer.status==='Invalid'?0:8"
                  :lg="dataList.offer.status==='Invalid'?0:8">
            <div class="student-status">
              <div class="status"
                   v-if="dataList.offer.status!=='Invalid'">
                <span class="label">Offer Status: </span>
                {{ dataList.offer.paid?"Payment Completed":dataList.offer.status }}
              </div>
              <div class="accept-btn">
                <el-button v-if="!dataList.offer.paid&&(dataList.offer.status === 'Pending'||dataList.offer.status === 'Accepted')"
                           type="primary"
                           :class="dataList.offer.status"
                           @click="acceptOffer()"
                           :disabled='dataList.offer.status==="Invalid"'>{{
                    dataList.offer.status === 'Pending'
                      ? 'Accept Offer'
                      : dataList.offer.status === 'Accepted'
                      ? 'Pay Offer'
                      : ''
                  }}</el-button>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="page-inner">
      <div class="page-msg">
        <div class="msg-caution"
             v-if="dataList.accountBlocked">
          Caution: Your account has been blocked by Student Admin Office, so you
          cannot be permitted to do some actions, e.g. module selection, check
          result and so on.
        </div>
      </div>
      <div>
        <el-alert v-if="dataList.waitingAcceptOfferNumbers>0"
                  type="warning"
                  :closable="false"
                  show-icon>
          <template slot="title">
            You have {{dataList.waitingAcceptOfferNumbers===1?'one':dataList.waitingAcceptOfferNumbers}} offer{{dataList.waitingAcceptOfferNumbers>1?'s':''}} awaiting acceptance. <a class="a-alert"
               @click="$router.push('/home/Offer')">Click here to check >></a>
          </template>
        </el-alert>
      </div>
      <div class="enrolment-list"
           id="Block_button">
        <div class="card"
             v-for="(item, index) in dataList.enrolments.list"
             :key="index">
          <div class="EnrolmentBox">
            <div class="EnrolmentTop"
                 style="border-color:#E6E7E8;">
              <div class="left">
                <span>Enrolment No.{{ item.code }}</span><span :class="item.status"
                      style="color:#fff;border-radius: 20px;">{{ item.status }}</span>
              </div>
              <div class="right"
                   style="padding-top:8px;">
                <div style="color: #fff;background: #830B31;"
                     class="selectionBtn"
                     @click="routerPath('/home/signList')"
                     :class="dataList.accountBlocked ? 'class-a' : '' "
                     v-if="item.status === 'Active'&&item.courseCode!='APYP'">
                  Module Selection
                </div>
                <div style="color: #fff;background: #636471;margin-left: 10px;"
                     class="timeTableBtn"
                     v-if="item.status !== 'Inactive'&&item.status !== 'Finished'&&item.courseCode!='APYP'"
                     @click="routerPath('/home/myTimeTable')"
                     :class="dataList.accountBlocked ? 'class-a' : '' ">
                  My Timetable
                </div>
                <div style="color: #fff;background: #636471;margin-left: 10px;"
                     class="resultsBtn"
                     v-if="item.status !== 'Inactive'&&item.courseCode!='APYP'"
                     :class="dataList.accountBlocked ? 'class-a' : '' "
                     @click="results(item.id, item.status)">
                  My Results
                </div>
              </div>
            </div>
            <!--EnrolmentTop-->
            <div class="EnrolmentDetails"
                 style="padding: 0 15px;">
              <span>Course: <strong :title="item.courseName">{{ item.courseName }}</strong></span>

              <span>Campus: <strong>{{ item.campusName }}</strong></span>
              <span>Start-to-End:
                <strong>{{ item.startDate | UTCTime }} to
                  {{ item.endDate | UTCTime}}</strong></span>
              <span>Credits Earned: <strong>{{ item.creditsEarned?item.creditsEarned:"0" }}</strong></span>
              <span>Scholarship:
                <strong>{{
                  item.scholarshipVo ? item.scholarshipVo.name : ' - - -'
                }}</strong></span>

              <span></span>
              <span class="statusEnrolled">Status: {{ item.coEnrollStatusName }}</span>

            </div>
          </div>
        </div>
      </div>
    </div>
    <pay-page v-if="dialogVisible"
              @close="state.dialogVisible = true"
              :id="id"
              :totalPayment="totalPayment"
              @success="getInfo"
              @default="getInfo"> </pay-page>
    <!--homePageTop-->
    <survey-dialog v-if="visible"
                   :id="queryId"
                   :visible="visible"
                   :mandatory="mandatory"
                   @close="visible = false"
                   @handleUpdate="handleUpdate"></survey-dialog>
    <!--Enrolment-->
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import { reactive, computed, onMounted, defineAsyncComponent } from "vue"
import request from '@/utils/request'
import { ElMessage, ElMessageBox } from "element-plus"
import { useRouter } from "vue-router"
import store from '@/stores'
const payPage = defineAsyncComponent(() => import('@/components/payPage.vue'))
const surveyDialog = defineAsyncComponent(() => import('@/components/surveyDialog.vue'))
export default {
  components: {
    'payPage': payPage,
    'surveyDialog': surveyDialog
  },
  setup() {
    const router = useRouter()
    const state = reactive({
      dialogVisiblePay: false,
      id: '',
      totalPayment: '',
      dialogVisible: false,
      dataList: {
        accountBlocked: '',
        offer: {
          status: ''
        },
        student: {},
        orderToPay: 'none',
        enrolments: {
          list: []
        }
      },
      /* survey query data */
      queryId: null,
      mandatory: null,
      visible: false,
      count: 0
    })
    const getInfo = () => {
      request.post('/student/homepage/view').then(res => {
        if (res && res.enrolments.list) {
          state.enrolments.list = res.enrolments.list.filter(v => v.coEnrollStatus !== 1360)
        }
        state.dataList = res
        !state.dataList.offer && (state.dataList.offer = {}, state.dataList.offer.status = 'Invalid')
        !!res.confirmProfileFirst && (
          ElMessageBox('Confirm your profile firstly', '', {
            comfirmButtonTxt: 'Go',
            type: 'warning',
            showClose: false
          }).then(() => {
            router.push('/home/myProfile')
          })
        )
        if (res.accountBlocked && res.confirmProfileFirst && res.needAnswerSurveys && res.needAnswerSurveys.length > 0) {
          state.queryId = res.needAnswerSurveys[0].id
          state.visible = true
          state.mandatory = res.needAnswerSurveys[0].mandatory

          store.dispatch('commitSurveryCount', ++state.count)
        }
      })
    }
    const changeImg = () => {

    }
    const results = (id, stauts) => {
      if (!state.dataList.accountBlocked) {
        router.push({
          path: `/home/myResult/${id}`,
          query: {
            stauts: status
          }
        })
      }
    }
    const acceptOffer = () => {
      state.id = state.dataList.offer.orderId
      state.totalPayment = state.dataList.offer.totalPayment
      if (state.dataList.offer.status === 'Accepted') {
        state.dialogVisible = true
      } else {
        ElMessageBox(`If you have read and understood what's been written in the offer, then you can continue to accept it.`, 'prompt', {
          confirmButtonText: 'YES',
          cancelButtonText: 'NO',
          type: 'warning'
        }).then(() => {
          if (state.dataList.offer.status === 'Pending') {
            request.post(`/student/offer/accept/${state.dataList.offer.id}`).then(res => {
              if (res.paid) {
                getInfo()
              } else {
                getInfo()
                state.dialogVisible = true
              }
            })
          }
        })
      }
    }
    const handleUpdate = (val) => {
      if (val) {
        getInfo()
      }
    }
    onMounted(() => [
      getInfo()
    ])
    return {
      handleUpdate, acceptOffer,
      results,
      changeImg,
      getInfo,
      onMounted
    }
  }
}
</script>
<style>
.el-message-box {
  min-width: 504px;
}
#Block_button .class-a:hover {
  cursor: not-allowed;
}
.home-header .student-info .current-course .course {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.home-header .student-info .current-course .campus {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
<style scoped lang="scss">
.homePage {
  width: 100%;
  height: 100%;
  min-width: 900px;
  box-sizing: border-box;
  .homePageTopBox {
    width: 100%;
    min-width: 900px;
    height: 140px;
    .userMessage {
      float: left;
      width: 45%;
      min-width: 440px;
      padding: 10px;
      height: 100%;
      border: 1px solid #eee;
      position: relative;
      box-sizing: border-box;
      .imgBox {
        float: left;
        width: 80px;
        height: 100%;
        border: 1px solid #eee;
        box-sizing: border-box;
        img {
          width: 100%;
          height: 100%;
          display: block;
        }
      }
      .modifyBtn {
        top: 15px;
        right: 15px;
        width: 30px;
        height: 30px;
        color: #d41e37;
        cursor: pointer;
        position: absolute;
      }
      .userMessageDetails {
        width: 320px;
        height: 100%;
        float: left;
        padding-left: 20px;
        box-sizing: border-box;
        span {
          color: #333;
          height: 20px;
          display: block;
          font-size: 14px;
          line-height: 20px;
          i {
            font-style: normal;
          }
        }
        .name {
          font-size: 16px;
        }
        .studentId {
          font-size: 15px;
        }
        .female {
          color: #666;
          font-size: 13px;
        }
        .call,
        .email {
          color: #666;
          position: relative;
          font-size: 13px;
          padding-left: 20px;
          i {
            top: 1px;
            left: 0;
            width: 18px;
            height: 18px;
            font-size: 16px;
            line-height: 18px;
            position: absolute;
          }
        }
        .userMessageTipBox {
          width: 100%;
          height: 20px;
          box-sizing: border-box;
          padding-top: 4px;
          .userMessageTip {
            color: #fff;
            float: left;
            width: 80px;
            height: 16px;
            font-size: 14px;
            border-radius: 4px;
            line-height: 16px;
            margin-right: 20px;
            text-align: center;
            background: #67c23a;
          }
        }
      }
    }
    .offerBox {
      float: right;
      width: 45%;
      min-width: 440px;
      padding: 10px;
      height: 100%;
      border: 1px solid #eee;
      position: relative;
      box-sizing: border-box;
      .offerBoxTitle {
        color: #333;
        font-size: 16px;
      }
      .downloadBox {
        cursor: pointer;
        height: 25px;
        padding: 30px 0;
        i {
          width: 25px;
          height: 25px;
          float: left;
          font-size: 20px;
          line-height: 25px;
        }
        span {
          float: left;
          color: #000;
          font-size: 17px;
          line-height: 25px;
          padding-left: 5px;
        }
      }
      .offerBtn {
        right: 20px;
        bottom: 20px;
        height: 40px;
        padding: 0;
        margin: 0;
        position: absolute;
        &.Accepted {
          background: #999;
        }
      }
      .status {
        color: #666;
        height: 20px;
        font-size: 13px;
        line-height: 20px;
        padding-left: 40px;
        box-sizing: border-box;
        strong {
          color: #333;
        }
      }
    }
  }
  .homePageTopTip {
    color: #fff;
    width: 100%;
    height: 40px;
    overflow: hidden;
    margin-top: 5px;
    background: #909399;
    font-size: 13px;
    padding: 0 5px;
    box-sizing: border-box;
    line-height: 40px;
    text-overflow: ellipsis;
  }
  .homePageTopError {
    color: #333;
    width: 100%;
    height: 40px;
    overflow: hidden;
    margin-top: 5px;
    background: #f56c6c;
    font-size: 13px;
    padding: 0 5px;
    box-sizing: border-box;
    line-height: 40px;
    text-overflow: ellipsis;
  }
  /*homePageTopBox*/
  .EnrolmentBox {
    width: 100%;
    height: 200px;
    .EnrolmentTop {
      width: 100%;
      height: 50px;
      border-bottom: 1px solid #333;
      padding: 0 20px;
      .left {
        float: left;
        width: 270px;
        height: 100%;
        font-size: 19px;
        box-sizing: border-box;
        line-height: 20px;
        padding-top: 15px;
        span {
          float: left;
        }
        .Active {
          width: 60px;
          height: 25px;
          font-size: 15px;
          margin-left: 10px;
          text-align: center;
          line-height: 25px;
          border-radius: 4px;
          background: #24b6f7;
        }
        .Finished {
          width: 60px;
          height: 25px;
          font-size: 15px;
          margin-left: 10px;
          text-align: center;
          line-height: 25px;
          border-radius: 4px;
          background: #333;
        }
        .Inactive {
          width: 60px;
          height: 25px;
          font-size: 15px;
          margin-left: 10px;
          text-align: center;
          line-height: 25px;
          border-radius: 4px;
          background: #666;
        }
      }
      .right {
        float: right;
        font-size: 14px;
        padding: 12px 0 2px 0;
        box-sizing: border-box;
        & > div {
          float: left;
          cursor: pointer;
          height: 35px;
          padding: 0 30px;
          position: relative;
          line-height: 35px;
          border-radius: 16px;
          i {
            left: 4px;
            top: 2.5px;
            width: 30px;
            height: 30px;
            position: absolute;
            font-size: 25px;
          }
        }
      }
    }
    .EnrolmentDetails {
      margin-top: 20px;
      span {
        float: left;
        width: 33%;
        color: #666;
        height: 25px;
        font-size: 12px;
        line-height: 25px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        strong {
          color: #333;
          font-size: 14px;
        }
      }
      .statusEnrolled {
        color: aqua;
        font-size: 14px;
      }
      .payment {
        color: palevioletred;
        font-size: 14px;
      }
    }
  }
}
.a-alert:hover {
  cursor: pointer;
}
</style>
