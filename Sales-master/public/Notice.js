var UEDhostnameList = {
  dev: '//admin-dev.bmtrip.com:8080',
  all: '//admin-all.bmtrip.com:8080',
  prod: '//admin.bmtrip.com:8080'
}

var SaleHostNameList2Env = {
  '172.16.1.14:9001': 'dev',
  'report-dev.bmtrip.com:9001': 'dev',
  '172.16.1.22:9992': 'all',
  'report-all.bmtrip.com:9992': 'all',
  'report.bmtrip.com': 'prod'
}

var SaleHostNameList = {
  'dev': '//172.16.1.14:9001',
  'all': '//172.16.1.22:9992',
  'prod': '//report.bmtrip.com'
}

var hostName = location.hostname
var env = SaleHostNameList2Env[hostName] || 'dev'

/* eslint-disable no-new, no-undef */
new Vue({
  el: '#notice-box',
  template: `
  <div class="notice">
  <Poptip placement="bottom-end" trigger="hover" width="560">
    <span class="noticeBtn">
      <Icon type="ios-notifications-outline" />
      通知
      <span class="nums">（{{ returnNums }}）</span>
    </span>
    <div slot="content">
      <ul class="option">
        <li :class="type == 1?'act':''" @click="changeType(1)">待办（{{ nums.task }}）</li>
        <li :class="type == 2?'act':''" @click="changeType(2)">通知（{{ nums.notice }}）</li>
        <li :class="type == 3?'act':''" @click="changeType(3)">消息（{{ nums.message }}）</li>
      </ul>
      <div class="list">
        <ul v-if="type===1" class = 'notice-list-box'>
          <li v-for="(item, index) in taskList" :key="index">
            <Tooltip>
              <span class="title">{{ item.title }}</span><a v-if="item.link" :href="item.link" target="_blank">立即处理>> </a>
              <div slot="content" style="white-space: normal;">{{ item.title }}</div>
            </Tooltip>
          </li>
        </ul>
        <!-- 通知 -->
        <div v-if="type === 2" class = 'notice-list-box'>
          <div v-for="(item, index) in noticeList" :key="index" class="item">
            <Tooltip>
              <div class="content">{{ item }}</div>
              <div slot="content" style="white-space: normal;">{{ item }}</div>
            </Tooltip>
          </div>
        </div>
        <!-- 消息 -->
        <div v-if="type === 3" class = 'notice-list-box'>
          <div v-for="(item, index) in messageList" :key="index" class="item">
            <Tooltip>
              <div class="content">{{ item }}</div>
              <div slot="content" style="white-space: normal;">{{ item }}</div>
            </Tooltip>
          </div>
        </div>
        <div class="seeAll" @click="seeAll">
          查看全部
        </div>
      </div>
    </div>
  </Poptip>
</div>
  `,
  name: 'Notice',
  data () {
    return {
      type: 1, // 选项类型 待办：1  通知：2  消息：3
      nums: {
        task: 0,
        notice: 0,
        message: 0
      },
      taskList: [], // 任务列表
      noticeList: [], // 通知列表
      messageList: [], // 消息列表
      ws: null, // websocket
      heartCheck: null, // 心跳请求
      reconnectClock: null, // 重连锁
      url: '172.16.1.14:9006', // 默认wesocket请求地址
      system: 'message_center',
      userid: ''
    }
  },

  computed: {
    // 返回总数
    returnNums () {
      return this.nums.task + this.nums.notice + this.nums.message
    }
  },

  watch: {
    url: function () {
      if (this.url !== '' && this.userid !== '' && !this.ws) {
        this.initWebSocket()
      }
    },

    userid: function () {
      if (this.url !== '' && this.userid !== '' && !this.ws) {
        this.initWebSocket()
      }
    }
  },

  mounted () {
    if (this.url !== '' && this.userid !== '' && this.system !== '') { // 属性具有用户id和socket链接地址
      this.initWebSocket()
    } else {
      // 获取用户userid url
      this.init()
    }
    Notification.requestPermission()
  },

  beforeDestroy () {
    // 关闭websocket连接
    this.ws.close()
  },

  methods: {
    init () {
      var websocketList = {
        'admintest.banma_cefu.com:8080': '172.16.1.14:9006',
        'plato-all.bmtrip.com': '172.16.1.22:9006',
        'admin.bmtrip.com:8080': 'msgconsumer.bmtrip.com',
        'preview.bmtrip.com': 'msgconsumer.bmtrip.com'
      }

      var xhr = new XMLHttpRequest()
      xhr.open('get', SaleHostNameList[env] + '/api/getUserInfo', true)
      xhr.withCredentials = true
      // xhr.setRequestHeader('Cookies', document.cookie)
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && (xhr.status === 200 || xhr.status === 304)) {
          var res = xhr.responseText
          res = JSON.parse(res)
          this.userid = res.data.datalist.id
        }
      }
      xhr.send()

      if (websocketList[location.host]) this.url = websocketList[location.host]
    },

    // 初始化websocket
    initWebSocket () {
      var wsUrl = 'ws://' + this.url + '/websocket?system_topic=' + this.system + '&userId=' + this.userid
      if ('WebSocket' in window || 'MozWebSocket' in window) {
        this.ws = new WebSocket(wsUrl)
      } else {
        this.$Notice.error({
          desc: '该浏览器不支持websocket，请使用谷歌浏览器或者火狐浏览器'
        })
        return
      }
      this.ws.onopen = this.wsOpen
      this.ws.onmessage = this.wsMessage
      this.ws.onerror = this.wsError
      this.ws.onclose = this.wsClose
    },

    // 事件触发建立一个连接
    wsOpen () {
      clearInterval(this.reconnectClock) // 关闭重连
    },

    // 监听事件
    wsMessage (res) {
      // 重置心跳计时
      clearTimeout(this.heartCheck)
      this.heartCheck = setTimeout(() => {
        this.ws.send(JSON.stringify({ 'code': 'heart', 'data': {} }))
      }, 20000)

      var { code, data } = JSON.parse(res.data)
      if (code === 'connect') {
        var list = data
        // 列表
        this.taskList = list.taskList
        this.noticeList = list.noticeList
        this.messageList = list.messageList
        // 数量
        this.nums.task = parseInt(list.taskNum)
        this.nums.notice = parseInt(list.noticeNum)
        this.nums.message = parseInt(list.messageNum)
      } else if (code === 'add') {
        if (+data.type === 1) { // 任务
          // 自定义任务提醒
          this.$Notice.open({
            render: h => {
              return h('div', [
                h('i', {
                  'class': {
                    'ivu-icon': true,
                    'ivu-icon-flag': true
                  },
                  'style': {
                    'vertical-align': 'top',
                    'font-size': '30px',
                    'color': '#d4237a'
                  }
                }),
                h('div', {
                  'domProps': {
                    'innerHTML': data.title
                  },
                  'style': {
                    'width': '80%',
                    'display': 'inline-block',
                    'margin-left': '20px'
                  }
                })
              ])
            }
          })

          if (this.nums.task >= 10) {
            this.taskList.pop()
          }
          this.taskList.unshift({
            title: data.title,
            link: data.link
          })
          this.nums.task++
          var idArr = localStorage.getItem('idArr')
          if (idArr) {
            var index = idArr.indexOf(data.id)
            if (index >= 0) {
              return
            } else {
              localStorage.setItem('idArr', idArr + ',' + data.id)
            }
          } else {
            localStorage.setItem('idArr', data.id)
          }
          var tmpTitle = data.title.length > 10 ? data.title.substring(0, 10) + '...' : data.title
          var tmpContent = data.content.length > 10 ? data.content.substring(0, 30) + '...' : data.content
          var task = new Notification(tmpTitle, {
            body: tmpContent,
            icon: '//banmatrip-public-test.oss-cn-shanghai.aliyuncs.com/banma.jpg'
          })
          task.onclick = () => {
            if (data.link) {
              window.open(data.link).focus()
            } else {
              var url = UEDhostnameList[env] + '/UED/noticeCenter/index.html#/task'
              window.open(url).focus()
            }
            return false
          }
        } else if (+data.type === 2) { // 通知
          // 自定义通知提醒
          this.$Notice.open({
            render: h => {
              return h('div', [
                h('i', {
                  'class': {
                    'ivu-icon': true,
                    'ivu-icon-chatbox-working': true
                  },
                  'style': {
                    'vertical-align': 'top',
                    'font-size': '30px',
                    'color': '#0275d6'
                  }
                }),
                h('div', {
                  'domProps': {
                    'innerHTML': data.title
                  },
                  'style': {
                    'width': '80%',
                    'display': 'inline-block',
                    'margin-left': '20px'
                  }
                })
              ])
            }
          })
          if (this.nums.notice >= 10) {
            this.noticeList.pop()
          }
          this.noticeList.unshift(data.title)
          this.nums.notice++
          var idArr = localStorage.getItem('idArr')
          if (idArr) {
            var index = idArr.indexOf(data.id)
            if (index >= 0) {
              return
            } else {
              localStorage.setItem('idArr', idArr + ',' + data.id)
            }
          } else {
            localStorage.setItem('idArr', data.id)
          }

          var tmpTitle = data.title.length > 10 ? data.title.substring(0, 10) + '...' : data.title
          var tmpContent = data.content.length > 10 ? data.content.substring(0, 30) + '...' : data.content
          var notice = new Notification(tmpTitle, {
            body: tmpContent,
            icon: '//banmatrip-public-test.oss-cn-shanghai.aliyuncs.com/banma.jpg'
          })
          notice.onclick = () => {
            var url = UEDhostnameList[env] + '/UED/noticeCenter/index.html#/notice'
            window.open(url)
            return false
          }
        } else if (data.type === 3) { // 消息
          // 自定义消息提醒
          this.$Notice.open({
            render: h => {
              return h('div', [
                h('i', {
                  'class': {
                    'ivu-icon': true,
                    'ivu-icon-chatbubble-working': true
                  },
                  'style': {
                    'vertical-align': 'top',
                    'font-size': '30px',
                    'color': '#f79c16'
                  }
                }),
                h('div', {
                  'domProps': {
                    'innerHTML': data.content
                  },
                  'style': {
                    'width': '80%',
                    'display': 'inline-block',
                    'margin-left': '20px'
                  }
                })
              ])
            }
          })

          if (this.nums.message >= 10) {
            this.messageList.pop()
          }
          this.messageList.unshift(data.content)
          this.nums.message++
          var idArr = localStorage.getItem('idArr')
          if (idArr) {
            var index = idArr.indexOf(data.id)
            if (index >= 0) {
              return
            } else {
              localStorage.setItem('idArr', idArr + ',' + data.id)
            }
          } else {
            localStorage.setItem('idArr', data.id)
          }

          var tmpTitle = data.title.length > 10 ? data.title.substring(0, 10) + '...' : data.title
          var tmpContent = data.content.length > 10 ? data.content.substring(0, 30) + '...' : data.content

          var message = new Notification(tmpTitle, {
            body: tmpContent,
            icon: '//banmatrip-public-test.oss-cn-shanghai.aliyuncs.com/banma.jpg'
          })
          message.onclick = () => {
            var url = UEDhostnameList[env] + '/UED/noticeCenter/index.html#/message'
            window.open(url)
            return false
          }
        }
      } else if (code === 'devare') {
        if (data.type === 1) { // 任务
          this.nums.task = data.num
          this.taskList = data.list
        } else if (data.type === 2) { // 通知
          this.nums.notice = data.num
          this.noticeList = data.list
        }
      }
    },

    // 错误事件
    wsError () {
    },

    // 关闭连接
    wsClose (evt) {
      if (!this.reconnectClock) {
        this.reconnectClock = setInterval(() => {
          this.initWebSocket()
        }, 10000)
      }
    },

    // 切换类型
    changeType (type) {
      if (this.type === type) {
        return
      }
      this.type = type
    },
    // 打开列表页查看全部
    seeAll () {
      var jumpList = {
        1: UEDhostnameList.dev + '/UED/noticeCenter/index.html#/task',
        2: UEDhostnameList.all + '/UED/noticeCenter/index.html#/notice',
        3: UEDhostnameList.prod + '/UED/noticeCenter/index.html#/message'
      }
      window.open(jumpList[this.type])
    }
  }

})
/* eslint-enable no-new, no-undef */
