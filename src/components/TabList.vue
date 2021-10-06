<template>
  <div class="page-tab">
    <div class="page-header">
      <h3 class="page-title">
        <router-link :to="mainUrl || include">{{ mainName }}</router-link>
      </h3>

      <div class="tab-wrap">
        <div class="page-nav-bar">
          <button class="page-nav-item"
                  v-for="(item, index) in tabs"
                  :key="item.id"
                  style="min-width: 170px;"
                  :class="{ active: item.path === $route.path }"
                  @click="goToTag(item)">
            {{ getItemName(item) }}
            <span @click.stop="closeTab(index, item)"
                  class="close"></span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
export default {
  name: 'TabList',
  props: {
    mainUrl: String,
    mainName: String,
  },
  setup(props, { emit }) {
    const tabs = reactive([])
    const router = useRouter()
    const getItemName = (item) => {
      if (item.meta && item.meta.title) {
        if (item.params.title) {
          return `${item.meta.title} ${item.params.title || ''}`
        }
        return item.meta.title
      }
      return item.name
    }
    const goTag = (tag) => {
      router.push(tag.fullPath)
    }
    const closeTab = (index) => {
      if (tabs.length > 0) {
        tabs.splice(index, 1)
        router.replace(tabs[index - 1])
      } else {
        router.replace(props.mainUrl)
      }
    }
    onMounted(() => {
      console.log('onMounted')
    })
    return {
      tabs,
      goTag,
      closeTab,
      getItemName,
      onMounted
    }
  }
}
</script>
<style lang="scss">
.page-tab {
  height: 60px;
  box-sizing: border-box;
}
</style>
