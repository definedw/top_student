<template>
  <div class="vue-wrapper">
    <router-view></router-view>
    <div id="mask"></div>
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
#mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3)
    url('data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJMMyIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiIHZpZXdCb3g9IjAgMCAxMDAgMTAwIiBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCAwIDAiIHhtbDpzcGFjZT0icHJlc2VydmUiPgo8Y2lyY2xlIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSI0IiBjeD0iNTAiIGN5PSI1MCIgcj0iNDQiIHN0eWxlPSJvcGFjaXR5OjAuNTsiPjwvY2lyY2xlPgo8Y2lyY2xlIGZpbGw9IiNmZmYiIGN4PSI4IiBjeT0iNTQiIHI9IjYiIHRyYW5zZm9ybT0icm90YXRlKDE0Ny4zMDUgNTAgNDkuNjM2NykiPgoJPGFuaW1hdGVUcmFuc2Zvcm0gYXR0cmlidXRlTmFtZT0idHJhbnNmb3JtIiBkdXI9IjJzIiB0eXBlPSJyb3RhdGUiIGZyb209IjAgNTAgNDgiIHRvPSIzNjAgNTAgNTIiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIj48L2FuaW1hdGVUcmFuc2Zvcm0+CjwvY2lyY2xlPgo8L3N2Zz4=')
    center center no-repeat;
  -webkit-background-size: 100px;
  background-size: 100px;
  z-index: 10000;
  display: none;
}
</style>
