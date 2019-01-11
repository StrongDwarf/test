module.exports = {
  pages: {
    customization: {
      entry: 'src/entry/customization/main',
      template: 'public/index.html',
      // 在 dist/customization.html 的输出
      filename: 'customization.html',
      // 当使用 title 选项时，
      // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
      title: '定制组报表'
      // 在这个页面中包含的块，默认情况下会包含
      // 提取出来的通用 chunk 和 vendor chunk。
      // chunks: ['chunk-vendors', 'chunk-common', 'index']
    },
    analyize: {
      entry: 'src/entry/analyze/main',
      template: 'public/index.html',
      filename: 'analyize.html',
      title: '定制组报表'
    }
  },
  baseUrl: '/',
  outputDir: 'dist',
  lintOnSave: true,
  productionSourceMap: false,
  // css: {
  //   modules: true
  // },
  parallel: require('os').cpus().length > 1,
  devServer: {
    open: process.platform === 'darwin',
    port: 8080,
    https: false,
    hotOnly: true,
    proxy: {
      '/api': {
        // target: 'http://172.16.41.73:9001/',
        target: 'http://172.16.1.14:9001/'
        // target:'http://127.0.0.1:9001/',
        // changeOrigin: true
        // pathRewrite: { '^/api': '' }
      }
    },
    before: app => {}
  },
  configureWebpack: {
    externals: {
      echarts: 'echarts'
    }
  }
}
