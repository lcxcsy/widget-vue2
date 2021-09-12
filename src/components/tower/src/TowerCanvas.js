/*
 * @Author: 刘晨曦
 * @Date: 2021-09-10 10:18:33
 * @LastEditTime: 2021-09-10 17:33:11
 * @LastEditors: Please set LastEditors
 * @Description: canvas 函数的封装
 * @FilePath: \widget-vue2\src\components\tower\lib\index.js
 */

export default class TowerCanvas {
  constructor ({ mCanvas, ctx, basePosition, width, height, count, rightLength }) {
    this.mCanvas = mCanvas
    this.ctx = ctx // 声明context对象
    this.basePosition = basePosition // 塔吊的基准位置
    this.width = width //  塔身每一层的宽度
    this.height = height // 塔身每一层的高度
    this.count = count // 塔身的节数
    this.rightLength = rightLength
    this.initBody()
    this.initRightArm()
    this.initCabAndBase()
    this.initRightArm()
  }

  /**
   * @description: 绘制矩形，主要分为:绘制填充矩形和绘制边框矩形和清除矩形区域(利用isClear标记是否绘制清除矩形，实际上就是绘制一个与画布背景色一致的矩形区域,利用isFill变量来标记)
   * @param {*} x 矩形起点的X坐标 (注意：相对坐标系是以画布的左上角为原点，向右为X坐标正方向，向下为Y坐标的正方向)
   * @param {*} y 矩形终点的Y坐标
   * @param {*} width 矩形的宽度
   * @param {*} height 矩形的高度
   * @param {*} isClear 是否绘制清除画布的矩形区域，true则就是绘制一个清除画布矩形区域，false就是绘制其他两种矩形
   * @param {*} isFill 是否是填充，false为绘制边框，true为绘制填充
   * @param {*} bgColor 矩形的颜色，若为填充则为整个矩形背景色，边框则为边框色
   * @return {*}
   */
  drawRect (x, y, width, height, isClear, isFill, bgColor) {
    // isClear：true 表示绘制清除画布的矩形区域，那么传入的isFill，bgColor值可以为任意值
    if (isClear) {
      this.ctx.clearRect(x, y, width, height)
    } else {
      // isFill：true，则绘制填充矩形
      if (isFill) {
        this.ctx.fillStyle = bgColor
        this.ctx.fillRect(x, y, width, height)
      } else {
        // false，则绘制边框矩形
        this.ctx.strokeStyle = bgColor
        this.ctx.strokeRect(x, y, width, height)
      }
    }
  }

  /**
   * @description: 绘制圆弧
   * @param {*} x 圆心X坐标
   * @param {*} y 圆心Y坐标
   * @param {*} radius
   * @param {*} startAngle 开始的弧度
   * @param {*} endAngle 结束的弧度
   * @param {*} anticlockwise true为逆时针，false为顺时针
   * @param {*} isOnlyArc
   * @param {*} isFill 是否是填充，false为绘制边框，true为绘制填充
   * @param {*} bgColor 圆弧的颜色
   * @return {*}
   */
  drawArc (x, y, radius, startAngle, endAngle, anticlockwise, isOnlyArc, isFill, bgColor) {
    if (isFill) {
      // true 绘制填充圆弧
      this.ctx.fillStyle = bgColor
      this.ctx.beginPath()
      this.ctx.arc(x, y, radius, this.getAngle(startAngle), this.getAngle(endAngle), anticlockwise)
      this.ctx.closePath()
      this.ctx.fill()
    } else {
      // false 绘制边框圆弧
      this.ctx.strokeStyle = bgColor
      this.ctx.beginPath()
      this.ctx.arc(x, y, radius, this.getAngle(startAngle), this.getAngle(endAngle), anticlockwise)
      // 如果绘制边框且绘制起点和终点就需要调用closePath()
      if (!isOnlyArc) {
        this.ctx.closePath()
      }
      this.ctx.stroke()
    }
  }

  /**
   * @description: 绘制扇形(主要分为：绘制填充扇形和绘制扇形边框利用isFill变量来标记）
   * @param {*} x 圆心X坐标
   * @param {*} y 圆心Y坐标
   * @param {*} radius
   * @param {*} startAngle 开始的弧度
   * @param {*} endAngle 结束的弧度
   * @param {*} anticlockwise true为逆时针，false为顺时针
   * @param {*} isFill 是否是填充，false为绘制边框，true为绘制填充
   * @param {*} bgColor 扇形的颜色
   * @return {*}
   */
  drawSector (x, y, radius, startAngle, endAngle, anticlockwise, isFill, bgColor) {
    if (isFill) {
      this.ctx.fillStyle = bgColor
      this.ctx.beginPath()
      this.ctx.moveTo(x, y) // 把路径移动到画布中的指定点，不创建线条，注意：绘制扇形唯一与绘制弧的区别在于，紧跟着beginPath()后面调用，首先将路径移动到圆心位置
      this.ctx.arc(x, y, radius, this.getAngle(startAngle), this.getAngle(endAngle), false)
      this.ctx.closePath()
      this.ctx.fill()
    } else {
      this.ctx.strokeStyle = bgColor
      this.ctx.beginPath()
      this.ctx.moveTo(x, y)
      this.ctx.arc(x, y, radius, this.getAngle(startAngle), this.getAngle(endAngle), false)
      this.ctx.closePath()
      this.ctx.stroke()
    }
  }

  /**
   * @description: 绘制线段, 主要分为：绘制填充线段和绘制空心线段利用isFill变量来标记
   * @param {*} startX 表示线的起点的X坐标
   * @param {*} startY 表示起点的Y坐标
   * @param {*} endX 表示线的终点的X坐标
   * @param {*} endY 表示线的终点的Y坐标
   * @param {*} lineWidth 表示线段的宽度
   * @param {*} bgColor 线的颜色
   * @return {*}
   */
  drawLine (startX, startY, endX, endY, lineWidth, bgColor) {
    this.ctx.beginPath()
    this.ctx.lineWidth = lineWidth
    this.ctx.strokeStyle = bgColor
    this.ctx.moveTo(startX, startY)
    this.ctx.lineTo(endX, endY)
    this.ctx.stroke()
    this.ctx.fill()
  }

  /**
   * @description: 将角度转换成弧度函数
   * @param {*} arc
   * @return {*}
   */
  getAngle (arc) {
    return Math.PI * (arc / 180)
  }

  /**
   * @description: 吊钩
   * @param {*} x 原点横坐标
   * @param {*} y 原点纵坐标
   * @param {*} X 变量值左右
   * @param {*} Y 变量值上下
   * @param {*} bgColor 颜色
   * @return {*}
   */
  variousHooks (x, y, X, Y, bgColor) {
    this.ctx.beginPath()
    this.ctx.strokeStyle = bgColor
    // 钩子头部分
    this.ctx.moveTo(x + 5 + X, y)
    this.ctx.lineTo(x + 35 + X, y)
    this.ctx.moveTo(x + 5 + X, y + 10)
    this.ctx.lineTo(x + 35 + X, y + 10)
    this.ctx.moveTo(x + 10 + X, y)
    this.ctx.lineTo(x + 10 + X, y + 10)
    this.ctx.moveTo(x + 30 + X, y)
    this.ctx.lineTo(x + 30 + X, y + 10)
    this.ctx.moveTo(x + 11 + X, y + 10)
    this.ctx.lineTo(x + 11 + X, y + 10 + Y)
    this.ctx.moveTo(x + 29 + X, y + 10)
    this.ctx.lineTo(x + 29 + X, y + 10 + Y)
    // 半圆
    this.ctx.moveTo(x + 20 + X, y + 10 + Y)
    this.ctx.arc(x + 20 + X, y + 10 + Y, 10, 0, 180 * Math.PI / 180, false)
    this.ctx.moveTo(x + 20 + X, y + 10 + Y + 5)
    this.ctx.lineTo(x + 10 + X, y + 10 + Y + 15)
    this.ctx.moveTo(x + 20 + X, y + 10 + Y + 5)
    this.ctx.lineTo(x + 30 + X, y + 10 + Y + 15)
    this.ctx.moveTo(x + 30 + X, y + 10 + Y + 15)
    this.ctx.lineTo(x + 30 + X, y + 10 + Y + 35)
    this.ctx.lineTo(x + 10 + X, y + 10 + Y + 35)
    this.ctx.lineTo(x + 10 + X, y + 10 + Y + 35)
    this.ctx.lineTo(x + 10 + X, y + 10 + Y + 15)
    this.ctx.lineTo(x + 30 + X, y + 10 + Y + 15)
    this.ctx.stroke()
    this.ctx.fill()
  }

  /**
   * @description: 塔吊叉线
   * @param {*} x
   * @param {*} y
   * @param {*} lineWidth
   * @param {*} bgColor
   * @return {*}
   */
  wiredCables (x, y, lineWidth, bgColor) {
    this.ctx.beginPath()
    this.ctx.lineWidth = lineWidth
    this.ctx.strokeStyle = bgColor
    this.ctx.moveTo(x, y)
    this.ctx.lineTo(x + 20, y - 30)
    this.ctx.moveTo(x, y - 30)
    this.ctx.lineTo(x + 20, y)
    this.ctx.stroke()
    this.ctx.fill()
  }

  /**
   * @description: 绘制文字
   * @param {*} text
   * @param {*} x
   * @param {*} y
   * @param {*} color
   * @param {*} font
   * @param {*} textAlign
   * @return {*}
   */
  drawText (text, x, y, color, font, textAlign) {
    this.ctx.font = font
    this.ctx.textAlign = textAlign
    this.ctx.fillStyle = color
    this.ctx.fillText(text, x, y)
  }

  initBody () {
    const { x, y } = this.basePosition
    const width = this.width
    const height = this.height
    const count = this.count
    const color = 'rgb(249, 179, 45)'
    this.ctx.clearRect(x, y, width, height * 8)
    for (let i = 0;i < count;i++) {
      this.drawArc(x, y - height * i, 2, 0, 360, false, false, true, color)
      this.drawArc(x + width, y - height * i, 2, 0, 360, false, false, true, color)
      if (i < count - 1) {
        this.wiredCables(x, y - height * i, 1, color)
        this.drawRect(x, y - height * (i + 1), width, height, false, false, color)
      }
    }
  }

  initRightArm () {
    const width = this.width
    const height = this.height
    const count = this.count
    const color = 'rgb(249,179,45)'
    const rightLength = this.rightLength
    const { x, y } = this.basePosition

    const lowHeight = y - height * count - 20
    const highHeight = y - height * count - 40
    // 右臂上下线条
    this.drawLine(x + width, lowHeight, 390, 110, 1, color)
    this.drawLine(x + width - 2, highHeight, 380, 90, 1, color)

    // 上下线见得线    比例1:2
    const rightCount = rightLength / 20
    for (let index = 0;index < rightCount;index++) {
      this.drawLine(x + width + 20 * index, lowHeight, x + width + 20 * (index + 1) - 10, highHeight, 1, color)
      this.drawLine(x + width + 20 * (index + 1), lowHeight, x + width + 20 * (index + 1) - 10, highHeight, 1, color)
    }
  }

  /**
   * @description: 初始化驾驶室
   * @param {*}
   * @return {*}
   */
  initCabAndBase () {
    const height = this.height
    const width = this.width
    const color = 'rgb(249, 179, 45)'
    const { x, y } = this.basePosition
    // 驾驶室
    // 左侧方块
    this.drawRect(x, y - height * 9 - 15, width / 2, 40, false, true, color)
    // 两条斜线
    this.drawLine(x + width, y - height * 9 - 15, x + width + 10, y - height * 9 + 5, 1, color)
    this.drawLine(x + width, y - height * 9 + 25, x + width + 10, y - height * 9 + 5, 1, color)
    // 三条横线
    this.drawLine(x + width - 10, y - height * 9 - 15, x + width, y - height * 9 - 15, 1, color)
    this.drawLine(x + width - 10, y - height * 9 + 5, x + width + 10, y - height * 9 + 5, 1, color)
    this.drawLine(x + width - 10, y - height * 9 + 25, x + width, y - height * 9 + 25, 1, color)

    // 底座横线
    this.drawLine(x - 60, y, x + 20 + 60, y, 2, color)
    // 底座斜线
    this.drawLine(x - Math.cos(Math.PI / 3) * height * 2, y, x, y - height * 2, 1.5, color)
    this.drawLine(x + Math.cos(Math.PI / 3) * height * 2 + width, y, x + width, y - height * 2, 1.5, color)
  }
}
