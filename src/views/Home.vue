<template>
  <div class="vue-wrapper">
    <keep-alive>
      <top-header></top-header>
    </keep-alive>
    <LeftSidebar></LeftSidebar>
    <div class="main">
      <!-- <keep-alive> -->
      <router-view />
      <!-- </keep-alive> -->
    </div>
  </div>
</template>

<script>
import { KeepAlive, ref } from 'vue'
import LeftSidebar from '@/components/LeftSidebar.vue'
import TopHeader from '@/components/TopHeader.vue'
export default {
  components: { TopHeader, LeftSidebar },
  setup() {

  }
}
</script>
