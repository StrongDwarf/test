export const customizationColor = (name) => {
  let colors = {
    '标品销售额': '#ffc000',
    '定制单销售额': '#99ccff',
    '总销售额': '#4bacc6'
  }
  return colors[name] || ''
}
