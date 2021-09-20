<template>
  <div class="vue-wrapper">
    <router-view></router-view>
  </div>
</template>
<script>
export default {}
</script>
<style lang="scss">
.el-notification.right {
  z-index: 4000 !important;
}
.el-message {
  z-index: 10000 !important;
}
input.el-input__inner {
  -webkit-appearance: none !important;
  background-color: #fff;
  background-image: none;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  border-top-color: rgb(220, 223, 230);
  border-right-color: rgb(220, 223, 230);
  border-bottom-color: rgb(220, 223, 230);
  border-left-color: rgb(220, 223, 230);
  box-sizing: border-box;
  color: #606266;
  display: inline-block;
  font-size: inherit;
  height: 40px !important;
  line-height: 40px;
  outline: none;
  padding: 0 15px;
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  width: 100%;
}
.vdp-datepicker__calendar {
  top: -50px;
}
.el-collapse-item__wrap {
  overflow-y: scroll !important;
}
.el-collapse-item__wrap::-webkit-scrollbar {
  display: none;
}
#supportonline .el-pagination button,
#supportonline .el-pagination span:not([class*='suffix']),
#supportonline .el-pager li,
#supportonline .el-pager {
  vertical-align: sub !important;
}
// .el-col-10 div:first-child {
//   width: 100% !important;
// }
</style>
