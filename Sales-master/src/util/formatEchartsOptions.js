import { customizationColor } from '@/type/color'
import { formatMoney } from './index'

function fullOptons (title, tooltip, xAxis, yAxis, series) {
  let legend = {
    top: 20,
    data: series.map(item => item.name)
  }
  let options = {
    title,
    legend,
    tooltip,
    xAxis,
    yAxis,
    series
  }
  return options
}

function xAxisStructure (options = {}) {
  let { showAllLabel, rotate } = options
  let xAxis = [
    {
      type: 'category',
      data: []
    }
  ]
  if (showAllLabel) {
    xAxis[0].axisLabel = {
      interval: 0,
      rotate: rotate || -30,
      showMaxLabel: true,
      showMinLabel: true
    }
  }
  return xAxis
}

function titleStructure ({ text }) {
  return {
    text
  }
}

function seriesStructure ({
  type = 'bar',
  name,
  color,
  stack,
  xAxisIndex,
  yAxisIndex,
  barGap
}) {
  let options = {
    name,
    type,
    data: []
  }
  if (color) {
    options.itemStyle = {
      color: customizationColor(name)
    }
  }
  if (yAxisIndex) options.yAxisIndex = yAxisIndex
  if (xAxisIndex) options.xAxisIndex = xAxisIndex
  if (stack) options.stack = stack
  if (barGap !== undefined) options.barGap = barGap
  return options
}

function commonTooltip (datas, type = 'sales') {
  let totalOrder = 0
  let total = 0
  let outputData = ''
  datas.reduce((prev, now) => {
    // 订单
    if (now.seriesType === 'line') {
      totalOrder += now.data
    } else {
      total = prev + now.data
    }
    outputData += now.seriesName + ':' + formatMoney(now.data) + '<br/>'
    return total
  }, total)
  outputData += '总销售额：' + formatMoney(total)
  if (type === 'order') outputData += '<br/>总订单数：' + formatMoney(totalOrder)
  return outputData
}

export const formatChannelSnapshot = (data) => {
  let xAxis = xAxisStructure({
    showAllLabel: true,
    rotate: -20
  })

  let yAxis = [
    {
      type: 'value'
    }
  ]

  let seriesSales = ['标品销售额', '定制单销售额'].map(item => {
    return seriesStructure({
      name: item,
      color: true,
      barGap: 0
    })
  })

  data.forEach(item => {
    xAxis[0].data.push(item.name)
    seriesSales[0].data.push(item.standard_sales)
    seriesSales[1].data.push(item.customize_sales)
    // seriesSales[2].data.push(item.total_sales)
  })

  let title = titleStructure({
    text: '渠道维度销售额'
  })

  let tooltip = {
    trigger: 'axis',
    formatter: function (datas) {
      return commonTooltip(datas)
    }
  }

  let options = fullOptons(title, tooltip, xAxis, yAxis, seriesSales)
  return options
}

export const emptyOptions = {
  legend: {
    data: []
  },
  series: [],
  xAxis: [],
  yAxis: [],
  title: {}
}

export const formatPersonalSnapshot = (data) => {
  let xAxis = xAxisStructure({
    showAllLabel: true
  })

  let yAxis = [
    {
      type: 'value',
      name: '销售额'
    },
    {
      type: 'value',
      name: '成单数'
    }
  ]

  let seriesSales = ['标品销售额', '定制单销售额'].map(item => {
    return seriesStructure({
      name: item,
      color: true,
      stack: 'sales'
    })
  })

  let seriesOrders = ['标品成单数', '定制成单数'].map(item => {
    return seriesStructure({
      name: item,
      type: 'line',
      xAxisIndex: 0,
      yAxisIndex: 1
    })
  })

  data.forEach(item => {
    xAxis[0].data.push(item.name)
    seriesSales[0].data.push(item.standard_sales)
    seriesSales[1].data.push(item.customize_sales)
    // seriesSales[2].data.push(item.total_sales)
    seriesOrders[0].data.push(item.standard_quantity)
    seriesOrders[1].data.push(item.customize_quantity)
    // seriesOrders[2].data.push(item.total_quantity)
  })
  // console.log(xAxis[0].data)
  // for (let i = 0; i <= 30; i++) {
  //   xAxis[0].data.push(`测试${i}`)
  // }

  let series = seriesSales.concat(seriesOrders)

  let title = titleStructure({
    text: '人员维度总销售额&成单数'
  })

  let tooltip = {
    trigger: 'axis',
    formatter: (datas) => {
      return commonTooltip(datas, 'order')
    }
  }

  let options = fullOptons(title, tooltip, xAxis, yAxis, series)
  console.log(options)
  return options
}
