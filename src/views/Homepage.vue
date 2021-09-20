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
          <!--<el-col :xs="24" :md="8">-->
          <!--<div class="current-course">-->
          <!--<div class="course" :title="dataListcourseName">{{ dataListcourseName}}</div>-->
          <!--<div class="campus" :title="dataListcampusName">{{ dataListcampusName }}</div>-->
          <!--</div>-->
          <!--</el-col>-->
          <el-col :xs="dataList.offer.status==='Invalid'?0:24"
                  :md="dataList.offer.status==='Invalid'?0:8"
                  :lg="dataList.offer.status==='Invalid'?0:8">
            <div class="student-status">
              <div class="status"
                   v-if="dataList.offer.status!=='Invalid'">
                <span class="label">Offer Status: </span>
                {{ dataList.offer.paid?"Payment Completed":dataList.offer.status }}
              </div>
              <!--<div class="offer" @click="openUrl()" v-if="dataList.offer">-->
              <!--Download Offer No: {{ dataList.offer.code }}-->
              <!--</div>-->
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

    <!--<div class="homePageTopBox" v-if="dataList.student.familyName">-->
    <!--<div class="userMessage">-->
    <!--<div class="imgBox">-->
    <!--<img :src="dataList.student.photo" alt="My Photo" />-->
    <!--</div>-->
    <!--<div-->
    <!--class="modifyBtn el-icon-upload"-->
    <!--@click="routerPath('/home/myProfile')"-->
    <!--&gt;</div>-->
    <!--<div class="userMessageDetails">-->
    <!--<span class="name"-->
    <!--&gt;{{ dataList.student.firstGivenName }}{{ ' '-->
    <!--}}{{ dataList.student.familyName }}</span-->
    <!--&gt;-->
    <!--<span class="studentId"-->
    <!--&gt;Student No. <i>{{ dataList.student.studentNum }}</i></span-->
    <!--&gt;-->
    <!--<span class="female"-->
    <!--&gt;{{ dataList.student.genderName }} | Birth:-->
    <!--{{ dataList.student.birthDate.split('T')[0] }}-->
    <!--| From china</span-->
    <!--&gt;-->
    <!--<span class="call"-->
    <!--&gt;<i class="el-icon-date"></i-->
    <!--&gt;{{ dataList.student.mobileNumber }}</span-->
    <!--&gt;-->
    <!--<span class="email"-->
    <!--&gt;<i class="el-icon-date"></i>{{ dataList.student.email2 }}</span-->
    <!--&gt;-->
    <!--<div class="userMessageTipBox">-->
    <!--<div class="userMessageTip">-->
    <!--{{-->
    <!--dataList.student.internationalStudent-->
    <!--? 'international'-->
    <!--: 'Domestic'-->
    <!--}}-->
    <!--</div>-->
    <!--<div class="userMessageTip" v-if="dataList.student.feeHelp">-->
    <!--FEE-HELP-->
    <!--</div>-->
    <!--</div>-->
    <!--</div>-->
    <!--</div>-->
    <!--&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;-->
    <!--&lt;!&ndash;userMessage&ndash;&gt;-->
    <!--<div class="offerBox">-->
    <!--<div class="offerBoxTitle">Current Offer</div>-->
    <!--<div class="downloadBox" @click="openUrl()" v-if="dataList.offer">-->
    <!--<i class="el-icon-printer"></i-->
    <!--&gt;<span>Download Offer No.{{ dataList.offer.code }}</span>-->
    <!--</div>-->
    <!--<div class="status" v-if="dataList.offer">-->
    <!--Status: <strong>{{ dataList.offer.status }}</strong>-->
    <!--</div>-->
    <!--&lt;!&ndash;當前 Pay Offer 功能缺失&ndash;&gt;-->
    <!--<el-button-->
    <!--type="primary"-->
    <!--class="offerBtn"-->
    <!--:class="dataList.offer.status"-->
    <!--@click="acceptOffer()"-->
    <!--v-if="dataList.offer"-->
    <!--&gt;{{-->
    <!--dataList.offer.status === 'Pending'-->
    <!--? 'Accept Offer'-->
    <!--: dataList.offer.status === 'Accepted'-->
    <!--? 'Pay Offer'-->
    <!--: ''-->
    <!--}}</el-button-->
    <!--&gt;-->
    <!--</div>-->
    <!--</div>-->

    <div class="page-inner">
      <div class="page-msg">
        <div class="msg-caution"
             v-if="dataList.accountBlocked">
          Caution: Your account has been blocked by Student Admin Office, so you
          cannot be permitted to do some actions, e.g. module selection, check
          result and so on.
        </div>
        <!--暂时-->
        <!--<div class="msg-notice" v-if="dataList.orderToPay !== 'none'">-->
        <!--{{-->
        <!--dataList.orderToPay === 'needToPay'-->
        <!--? `Notice: The due date of this semester for payment is ${formatDate(-->
        <!--dataList.orderPaymentExpireTime-->
        <!--)}. Please pay the tuition before the due date, or overdue penalty will be imposed.`-->
        <!--: 'Notice: The overdue penalty will be charged by the day. Please pay the tuition as soon as possible.'-->
        <!--}}-->
        <!--</div>-->
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
                <!--<div-->
                <!--style="color: #fff;background: #636471;margin-left: 10px;"-->
                <!--class="resultsBtn"-->
                <!--v-if="item.graduated"-->
                <!--@click="Completion(item.id, item.status)"-->
                <!--&gt;-->
                <!--Completion Letter-->
                <!--</div>-->
              </div>
            </div>
            <!--EnrolmentTop-->
            <div class="EnrolmentDetails"
                 style="padding: 0 15px;">
              <span>Course: <strong :title="item.courseName">{{ item.courseName }}</strong></span>
              <!--<span v-if="item.wallet"-->
              <!--&gt;Deposit Balance:-->
              <!--<strong>A${{ item.wallet.balance | format }}</strong></span-->
              <!--&gt;-->
              <span>Campus: <strong>{{ item.campusName }}</strong></span>
              <span>Start-to-End:
                <strong>{{ item.startDate | UTCTime }} to
                  {{ item.endDate | UTCTime}}</strong></span>
              <span>Credits Earned: <strong>{{ item.creditsEarned?item.creditsEarned:"0" }}</strong></span>
              <span>Scholarship:
                <strong>{{
                  item.scholarshipVo ? item.scholarshipVo.name : ' - - -'
                }}</strong></span>

              <!--<span-->
              <!--&gt;Paid Fees:-->
              <!--<strong>A${{ item.paidFees | format }}</strong></span-->
              <!--&gt;-->

              <!--<span-->
              <!--&gt;Unpaid Fees:-->
              <!--<strong>A${{ item.unpaidFees | format }}</strong></span-->
              <!--&gt;-->
              <span></span>
              <span class="statusEnrolled">Status: {{ item.coEnrollStatusName }}</span>
              <!--<span class="payment" style="padding-left: 0;background: #fff"-->
              <!--&gt;Disabled Payment: {{ item.disabledPayment?'Yes':'No' }}</span-->
              <!--&gt;-->
            </div>
          </div>
        </div>
      </div>
    </div>
    <paypage v-if="dialogVisible"
             @close="closed"
             :id="id"
             :totalPayment="totalPayment"
             @success="getInfo"
             @default="getInfo"> </paypage>
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
// import TabList from '../components/TabList'
import dataUtils from '../utils/DateUtils'
import paypage from '../components/paypage'
import surveyDialog from './Survey/surveyDialog'
export default {
  data() {
    return {
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
    }
  },
  created() {
    this.getInfo()
  },
  methods: {
    changeImg(e) {
      e.currentTarget.src = require('@/assets/timg.jpeg')
    },
    // //向服务端发消息
    closed(data) {
      this.dialogVisible = data
    },
    // Completion(id, status) {
    //   this.$http
    //     .get(
    //       '/student/homepage/getCompletionLetterOfEnrolment?enrolmentId=' + id
    //     )
    //     .then(res => {
    //       console.log(res)
    //       window.open(res.url)
    //     })
    // },
    results(id, status) {
      if (!this.dataList.accountBlocked) {
        this.$router.push({
          path: `/home/myResult/${id}`,
          query: {
            status: status
          }
        })
      }

    },
    routerPath(path) {
      if (!this.dataList.accountBlocked) {
        this.$router.push(path)
      } else { return false }

    },
    // 路由
    formatDate(val) {
      if (!val) {
        return ''
      }
      return dataUtils.formatDate(new Date(val), 'dd/MM/yyyy')
    },
    // 日期格式化
    openUrl() {
      let url = this.dataList.offer.offerFile
      if (!url) {
        return false
      }
      window.open(url, '_blank')
    },

    acceptOffer() {
      this.id = this.dataList.offer.orderId
      this.totalPayment = this.dataList.offer.totalPayment
      if (this.dataList.offer.status === 'Accepted') {
        // this.id=this.dataList.offer.orderId
        // this.totalPayment=this.dataList.offer.totalPayment
        // this.$alert('<p>If you have any questions regarding your payment, you may contact our financial department via<a href="mailto:fees@top.edu.au" target="_blank"> fees@top.edu.au</a> for further assistance. </p>', 'Notice', {
        //   dangerouslyUseHTMLString: true
        // });
        this.dialogVisible = true
      } else {
        this.$confirm(
          "If you have read and understood what's been written in the offer, then you can continue to accept it.",
          'prompt',
          {
            confirmButtonText: 'YES',
            cancelButtonText: 'NO',
            type: 'warning'
          }
        )
          .then(() => {
            if (this.dataList.offer.status === 'Pending') {
              this.$http
                .post(`/student/offer/accept/${this.dataList.offer.id}`)
                .then((res) => {
                  if (res.paid) {
                    this.getInfo()
                  } else {
                    this.getInfo()
                    // this.id=this.dataList.offer.orderId
                    // this.totalPayment=this.dataList.offer.totalPayment


                    // this.$alert('<p>If you have any questions regarding your payment, you may contact our financial department via<a href="mailto:fees@top.edu.au" target="_blank"> fees@top.edu.au</a> for further assistance. </p>', 'Notice', {
                    //   dangerouslyUseHTMLString: true
                    // });
                    this.dialogVisible = true
                  }
                })
            }
            // else{
            //   // this.id=this.dataList.offer.orderId
            //   // this.totalPayment=this.dataList.offer.totalPayment
            //   this.dialogVisible=true
            // }
            // this.dialogVisible=true
          })
          .catch(() => {

          })
      }

    },
    handleUpdate(val) {
      console.log('handleUpdate', val)
      if (val) {
        this.getInfo()
      }
    },
    getInfo() {
      this.dialogVisible = false
      this.$http.post('/student/homepage/view', {}).then(data => {
        // About Edit Infomation Student USI
        sessionStorage.setItem('subOrganization', data.subOrganizationCode)
        sessionStorage.setItem('currentCourseType', data.currentCourseType)
        if (data && data.enrolments.list) {
          data.enrolments.list = data.enrolments.list.filter(v => v.coEnrollStatus !== 1360)
        }
        this.dataList = data
        if (!this.dataList.student.photo) {
          this.dataList.student.photo = require('@/assets/timg.jpeg')
        }
        this.$emit('subOrganizationCode', data.subOrganizationCode)
        if (!this.dataList.offer) {
          this.dataList.offer = {}
          this.dataList.offer.status = "Invalid"
        }
        if (data.confirmProfileFirst) {
          this.$alert('Confirm Your Profile Firstly', '', {
            confirmButtonText: 'Go',
            type: 'warning',
            showClose: false
          })
            .then(() => {
              this.$router.push('/home/myProfile')
              // this.routerPath('/home/myProfile')
            })
            .catch(() => { })
        }
        if (!data.accountBlocked && !data.confirmProfileFirst && data.needAnswerSurveys && data.needAnswerSurveys.length > 0) {
          this.queryId = data.needAnswerSurveys[0].id
          this.visible = true
          this.mandatory = data.needAnswerSurveys[0].mandatory
          sessionStorage.setItem('surveyCount', ++this.count)
        }
      })
    }
  },
  computed: {
    dataListcourseName: function () {
      if (
        this.dataList &&
        this.dataList.enrolments &&
        this.dataList.enrolments.list
      ) {
        if (this.dataList.enrolments.list[0]) {
          return this.dataList.enrolments.list[0].courseName
        }
        return ''
      } else {
        return ''
      }
    },
    dataListcampusName: function () {
      if (
        this.dataList &&
        this.dataList.enrolments &&
        this.dataList.enrolments.list
      ) {
        if (this.dataList.enrolments.list[0]) {
          return this.dataList.enrolments.list[0].campusName
        } else {
          return ''
        }
      } else {
        return ''
      }
    },
  },
  filters: {
    routerPath(url) {
      this.$router.push(url)
    },
    format(num) {
      if (!num) {
        return '0.00'
      }
      let reg = /\d{1,3}(?=(\d{3})+$)/g

      if (num.toString().indexOf('.') !== -1) {
        let arr = num.toFixed(2).split('.')
        let str = (arr[0] + '').replace(reg, '$&,')
        return str + arr[1]
      } else {
        return (num + '').replace(reg, '$&,') + '.00'
      }
    },
    // 千分符console.log(num)
    getDate(val) {
      if (!val) {
        return ''
      }
      return dataUtils.formatDate(new Date(val), 'dd/MM/yyyy')
    }
  },
  components: {
    // TabList
    paypage,
    surveyDialog
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
