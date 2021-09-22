import { defineConfig } from 'vite'
import path from 'path'
import vue from '@vitejs/plugin-vue'
// import vitePluginImport from 'vite-plugin-babel-import'
import styleImport from 'vite-plugin-style-import'

import ViteCompression from 'vite-plugin-compression'

import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    fs: {
      strict: false
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      views: path.resolve(__dirname, './src/views'),
      components: path.resolve(__dirname, './src/components'),
      stores: path.resolve(__dirname, './src/stores'),
      utils: path.resolve(__dirname, './src/utils'),
      comps: path.resolve(__dirname, './src/compoents'),
      images: path.resolve(__dirname, './src/assets/images'),
      icons: path.resolve(__dirname, './src/assets/icons'),
      styles: path.resolve(__dirname, './src/assets/styles'),
      fonts: path.resolve(__dirname, './src/assets/fonts'),
    },
  },
  build: {
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
  plugins: [
    vue(),
    vueJsx(),
    // vitePluginImport({
    //   libraryName: 'element-plus',
    //   libraryDirectory: 'es',
    //   style(name) {
    //     return `element-plus/lib/theme-chalk/${name}.css`
    //   },
    // }),
    styleImport({
      // 注意 styleImport 这个名字不能改
      libs: [
        {
          libraryName: 'element-plus',
          esModule: true,
          ensureStyleFile: true,
          resolveStyle: (name) => {
            // 引入 .scss 样式
            // eslint-disable-next-line no-param-reassign
            name = name.slice(3)
            return `element-plus/packages/theme-chalk/src/${name}.scss`
          },
          // resolveStyle: (name) => `element-plus/lib/theme-chalk/${name}.css`, // 引入 .css 样式
          resolveComponent: (name) => `element-+lus/lib/${name}`,
        },
      ],
    }),
    ViteCompression({
      //生成压缩包gz
      verbose: true,
      disable: false,
      threshold: 10240,
      algorithm: 'gzip',
      ext: '.gz',
    }),
  ],
})
