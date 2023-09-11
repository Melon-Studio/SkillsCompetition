module.exports = {
    devServer: {
      proxy: {
        '/api': {
          target: 'http://localhost:5205', // 你的API服务器地址
          changeOrigin: true,
          pathRewrite: {
            '^/api': '' // 如果API地址是以/api开头的，可以将其重写为空字符串
          }
        }
      }
    }
  }
