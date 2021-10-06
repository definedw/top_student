<template>
  <header class="main-header">
    <div class="nav-toggle">
      <!-- 下面的 btn-toggle 添加样式收缩 toggled  -->
      <button class="btn-toggle"
              :class="{ toggled: state.toggled }"
              @click="toggle">
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
    </div>
    <div class="logo-header">
      <img src="@/assets/images/logo@2x.png" />
    </div>
    <ul class="topbar-nav">
      <li class="account">
        <a class="account-info"
           href="javascript:void(0)"
           @click="openProfile">
          <img v-if="state.photo"
               :src="state.photo"
               style="border-radius: 50%;width: 100%;height: 100%"
               @error="changeImg($event)" />
          <i class="ico ico-user"
             v-else-if="!state.photo"></i>
        </a>
      </li>
      <li class="top-help">
        <a class=""
           href="https://www.top.edu.au/"
           target="_blank"><i class="ico ico-help"></i></a>
      </li>
      <li class="top-setting">
        <a class=""
           href="javascript:void(0)"
           @click="openSetting"><i class="ico ico-setting"></i></a>
      </li>
      <li class="top-signout">
        <a class=""
           href="javascript:void(0)"
           @click="signOut"><i class="ico ico-signout"></i></a>
      </li>
    </ul>
  </header>

</template>

<script>
import { onMounted, reactive, computed } from "vue"
import { useRouter } from "vue-router"
import { addClass, removeClass, localGet } from '@/utils/helper'
import request from "@/utils/request"
import store from "@/stores"

import noImg from "../assets/images/timg.jpeg"
export default {
  setup(context, { emit }) {
    const state = reactive({
      photo: "",
      toggled: false
    })
    const router = useRouter()
    onMounted(() => {
      const url = `/student/homepage/view`
      if (!store.state.headImg) {
        request.post(url).then(res => {
          state.photo = res.data.student.photo
          store.dispatch('commitHeadImg', res.data.student.photo)
          store.dispatch('commitCode', res.data.subOrganizationCode)
        })
      } else {
        state.photo = store.state.photo
      }
    })
    const changeImg = (e) => {
      e.currentTarget.src = noImg
    }
    const toggle = () => {
      state.toggled = !state.toggled
      if (state.toggled) {
        addClass(document.body, 'sidebar-toggled')
      } else {
        removeClass(document.body, 'sidebar-toggled')
      }
      emit('input', state.toggled)
    }
    const signOut = () => {
      request.get('/private/auth/signout')
        .then(() => {
          store.commit('LOGIN_OUT')
          router.push('/login')
        })
        .catch(() => {
          store.commit('LOGIN_OUT')
        })
    }
    const openSetting = () => {
      router.push('/setting')
    }
    const openProfile = () => {
      router.push('/profile')
    }
    return {
      state,
      onMounted,
      openProfile,
      openSetting,
      signOut,
      changeImg,
      toggle
    }
  }
}
</script>
