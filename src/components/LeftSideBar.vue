
<template>
  <div class="sidebar">
    <!-- 在body 上添加样式打开边栏 -->
    <!-- vite无法监听文件变化，问题未知 -->
    <div class="sidebar-content ">
      <!--<h2 class="nav-title">{{ title }}</h2>-->
      <ul class="nav">
        <li :class="{ active: $route.matched.some(m => m.path === item.url) }"
            v-for="item in showleftList"
            :key="item.id">
          <router-link :to="item.url">
            <i :class="'ico ' + item.icon"></i>
            {{ item.name }}
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { computed, reactive } from "vue"
import store from "@/stores"
export default {
  name: 'LeftSideBar',
  setup() {
    const state = reactive({
      leftList: [
        {
          id: '1',
          url: '/home/homePage',
          icon: '',
          name: 'Home'
        },
        {
          id: '7',
          url: '/home/Offer',
          icon: '',
          name: 'Offers'
        },
        {
          id: '4',
          url: '/home/Orders',
          icon: '',
          name: 'Orders'
        },
        {
          id: '5',
          url: '/home/WalletList',
          icon: '',
          name: 'Wallet'
        },
        {
          id: '6',
          url: '/home/supportonline',
          icon: '',
          name: 'Support Online'
        }
      ]
    })
    const computeSubcode = computed(() => {
      return store.state.subOrganizationCode
    })
    const showleftList = computed(() => {
      if (computeSubcode.value == 'PY') {
        return state.leftList.filter(item => {
          return item.id != 5
        })
      } else {
        return state.leftList
      }
    })

    return {
      showleftList,
      state
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
