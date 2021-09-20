module.exports = {
  plugins: [
    // 前缀追加
    require('autoprefixer')({
      overrideBrowserslist: [
        'iOS 8.1',
        'Chrome > 41',
        'ff > 31',
        'ie >= 8',
        '> 1%',
      ],
      grid: true,
    }),
    require('postcss-flexbugs-fixes'),
  ],
}
