import {
  ElAlert,
  ElIcon,
  ElBadge,
  ElCard,
  ElDatePicker,
  ElCheckbox,
  ElInput,
  ElRow,
  ElCol,
  ElDialog,
  ElForm,
  ElFormItem,
  ElTable,
  ElTableColumn,
  ElLoading,
  ElMessage,
} from 'element-plus'

export const components = [
  ElAlert,
  ElIcon,
  ElBadge,
  ElCard,
  ElDatePicker,
  ElCheckbox,
  ElInput,
  ElRow,
  ElCol,
  ElDialog,
  ElForm,
  ElFormItem,
  ElTable,
  ElTableColumn,
]
export const plugins = [ElLoading, ElMessage]

export default (app) => {
  components.forEach((component) => app.component(component.name, component))
  plugins.forEach((plugin) => app.use(plugin))
}
