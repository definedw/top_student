<template>
  <div class="vue-wrapper">
    <keep-alive>
      <top-header></top-header>
    </keep-alive>
    <left-sidebar :subOrganizationCode="subOrganizationCode"></left-sidebar>
    <div class="main">
      <!-- <keep-alive> -->
      <router-view v-on:subOrganizationCode="getSubOrganizationCode" />
      <!-- </keep-alive> -->
    </div>
  </div>
</template>

<script>
import { KeepAlive, ref } from 'vue'
import LeftSidebar from '@/components/LeftSidebar.vue'
import TopHeader from '@/components/TopHeader.vue'
export default {
  components: { LeftSideBar, TopHeader },
  setup() {
    const subOrganizationCode = ref('')
    const getSubOrganizationCode = (data) => subOrganizationCode.value = data

    return {
      subOrganizationCode,
      getSubOrganizationCode
    }
  }
}
</script>
