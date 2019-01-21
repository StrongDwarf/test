module.exports = {
  pages: {
    customization: {
      entry: 'src/entry/customization/main',
      template: 'public/index.html',
      filename: 'customization.html',
      // 当使用 title 选项时，
      // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
      title: '定制组报表'
    },
    analyze: {
      entry: 'src/entry/analyze/main',
      template: 'public/index.html',
      filename: 'analyze.html',
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
        target: 'http://172.16.1.14:9001/',
        // pathRewrite: {
        //     '^/api': ''
        // },
        changeOrigin: true
      }
    },
    before: app => {}
  },
  configureWebpack: {
    externals: {
      echarts: 'echarts',
      vue: 'Vue',
      iview: 'Iview'
    }
  }
}
