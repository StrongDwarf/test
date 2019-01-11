import Axios from 'axios'
import ElementUI from 'element-ui'

Axios.interceptors.response.use(response => {
  if (response.status === 200) {
    if (response.data && response.data.code === '200') {
      if (!response.data.data) response.data.data = 'success'
      return response.data.data
    } else {
      ElementUI.Notification.error({
        title: '接口错误',
        message: response.data.message
      })
    }
  } else {
    ElementUI.Notification.error({
      title: '请求失败',
      message: response.status
    })
  }
})

export default Axios
