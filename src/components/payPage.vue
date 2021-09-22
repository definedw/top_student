<template>
  <el-dialog title="Payment"
             :visible.sync="outerVisible"
             :close-on-click-modal="false"
             @close="closed"
             id="pay-page">
    <el-dialog width="460px"
               title="BPay"
               :visible.sync="innerVisible"
               append-to-body>
      <div style="margin-top:-20px;border: 1px solid #dcdcdc;padding: 14px">
        <div style="display: flex;">
          <div style="float: left;width: 75px">
            <img src="../views/image/02@2x.png"
                 alt=""
                 style="width: 60px; height: 90px" />
          </div>
          <div style="border: 1px solid #dcdcdc;float: left;height: 40px;flex: 1;height: 90px;padding:10px;">
            <el-row class="font-Title"
                    style="color: #002a70;font-size: 21px;font-weight: 600">Biller Code: {{ bPayObj.billerCode }}</el-row>
            <el-row class="font-Title"> Ref: {{ bPayObj.ref }}</el-row>
          </div>
        </div>
        <div style="margin-top:15px;">
          <el-row class="font-Title">Telephone & Internet Banking – BPAY®</el-row>
          <el-row style="color: #002a70">
            Contact your bank or financial institution to make this payment from
            your cheque, savings, debit or transaction account. More info:
            www.bpay.com.au
          </el-row>
        </div>
      </div>
    </el-dialog>
    <h3 class="payment">Amount Payable: A$ {{ this.totalPayment }}</h3>
    <el-row style="width: 80%;margin: 0 auto">
      <!-- <el-col :span="8"
              class="pay-item"
              v-if="!onlyB">
        <div class="pay-box">
          <div style="height: 140px;display: flex;flex-direction: column;justify-content: center">
            <img src="../views/image/01@2x.png"
                 alt="" />
          </div>
          <el-button @click="payoffer(1)"
                     type="danger"
                     plain>Pay</el-button>
        </div>
      </el-col> -->
      <el-col :span="8"
              :offset="4"
              class="pay-item"
              v-if="!onlyB">
        <div class="pay-box">
          <div style="height: 140px;display: flex;flex-direction: column;justify-content: center">
            <img src="../views/image/03@2x.png"
                 alt="" />
          </div>
          <el-button @click="payoffer(2)"
                     type="danger"
                     plain>Pay</el-button>
        </div>
      </el-col>
      <el-col :span="8"
              class="pay-item">
        <div class="pay-box">
          <div style="height: 140px;display: flex;flex-direction: column;justify-content: center">
            <img src="../views/image/02@2x.png"
                 alt=""
                 style="width: 74px;height: 96px;margin: 0 auto" />
          </div>
          <el-button type="danger"
                     plain
                     @click="payoffer(3)">Pay</el-button>
        </div>
      </el-col>
    </el-row>
    <!--<div slot="footer" class="dialog-footer">-->
    <!--<el-button @click="outerVisible = false">Cancel</el-button>-->
    <!--<el-button type="primary" @click="innerVisible = true"></el-button>-->
    <!--</div>-->
  </el-dialog>
</template>

<script>
export default {
  name: 'paypage',
  data() {
    return {
      loadmark: {},
      outerVisible: true,
      innerVisible: false,
      bPayObj: {
        billerCode: '',
        ref: ''
      }
    }
  },
  props: {
    onlyB: '',
    id: '',
    totalPayment: ''
  },
  methods: {
    payoffer(num) {
      let paymethod = ''
      this.loadmark = this.$loading({
        lock: true,
        text: 'Paying',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      switch (num) {
        case 1:
          paymethod = 'ALIPAY'
          break
        case 2:
          paymethod = 'CYBERSOURCE'
          break
        case 3:
          paymethod = 'BPAY'
          this.innerVisible = true
          break
        default:
      }
      if (num !== 3) {
        this.$http
          .post('/student/payment/payOrder/' + this.id + '/' + paymethod, {})
          .then(res => {
            const result = res
            const newWindow = window.open('', '_blank')
            newWindow.document.body.innerHTML = result
            newWindow.document.forms[0].submit()
          })
          .then(() => {
            this.init()
          })
          .catch(() => {
            this.loadmark.close()
            this.$message.error('Payment connection failed')
          })
      } else {
        this.$http
          .post('/student/payment/payOrder/' + this.id + '/' + paymethod, {})
          .then(res => {
            console.log(res)
            this.bPayObj = JSON.parse(res)
            this.loadmark.close()
          })
          .catch(() => {
            this.loadmark.close()
          })
      }
    },
    init: async function () {
      if (typeof WebSocket === 'undefined') {
        alert('Your browser does not support socket')
      } else {
        // 实例化socket
        // this.socket = new WebSocket('ws://103.60.20.43/student/payment/offer/'+this.dataList.offer.id)
        this.socket = new WebSocket(
          'ws://' +
          this.$http
            .baseURL()
            .replace(`${window.location.protocol + '//'}`, '') +
          '/student/payment/order/' +
          this.id
        )
        // 监听socket连接
        this.socket.onopen = this.open
        // 监听socket错误信息
        this.socket.onerror = this.error
        // 监听socket消息
        this.socket.onmessage = this.getMessage
      }
    },
    open: function () {
      console.log('socket连接成功')
    },
    error: function () {
      console.log('连接错误')
    },
    getMessage: function (msg) {
      if (JSON.parse(msg.data).result.search('paid success') != -1) {
        this.loadmark.close()
        this.$message({
          type: 'success',
          message: 'Success'
        })
        this.$route.push({
          path: ''
        })
        setTimeout(() => {
          this.$emit('success', 'success')
        }, 2000)
      }
      if (JSON.parse(msg.data).code == 406) {
        this.loadmark.close()
        this.$message.error('Failure to pay')
        setTimeout(() => {
          this.$emit('default', 'default')
        }, 2000)
      }
      console.log(msg)
      console.log(msg.data)
    },
    send: function () {
      this.socket.send(params)
    },
    close: function () {
      console.log('socket已经关闭')
    },
    // handleClose(done) {
    //   this.$confirm('确认关闭？')
    //     .then(_ => {
    //       done();
    //     })
    //     .catch(_ => {});
    // },
    closed() {
      this.$emit('close', false)
    }
  }
}
</script>

<style>
.font-Title {
  color: #002a70;
  font-size: 21px;
  font-weight: 600;
}
.pay-box {
  width: 80%;
  text-align: center;
  margin: 0 auto;
}
.pay-box:hover {
  cursor: pointer;
}
#pay-page .el-dialog__header {
  background: #f56c6c;
  font-weight: 600;
  padding: 20px;
}
#pay-page .el-dialog__title {
  color: #fff;
  font-size: 30px;
}
#pay-page .el-dialog__body {
  padding: 0 0 30px 0;
}
.payment {
  color: #000000;
  font-weight: 600;
  padding-left: 20px;
  background: #f7f7f7;
  height: 45px;
  line-height: 45px;
}
#pay-page img {
  display: flex;
  align-items: center;
  justify-content: center;
}
#pay-page .pay-button {
  background: #ff4712b5 !important;
}
#pay-page .el-button:focus,
.el-button:hover {
  color: #fff !important;
}
#pay-page .el-dialog__headerbtn .el-dialog__close {
  color: #fff;
  top: 26px;
}
/*.pay-item{*/
/*height: 200px;*/
/*}*/
</style>
