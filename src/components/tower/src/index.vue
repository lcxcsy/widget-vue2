<!--
 * @Author: 刘晨曦
 * @Date: 2021-09-09 20:17:33
 * @LastEditTime: 2021-09-10 17:29:54
 * @LastEditors: Please set LastEditors
 * @Description: 可动的塔吊
 * @FilePath: \widget-vue2\src\components\tower\src\index.vue
-->
<template>
  <canvas
    id="towerCanvas"
    width="500"
    height="500"
  >当前浏览器不支持Canvas</canvas>
</template>

<script>
import TowerCanvas from './TowerCanvas'
let canvasInstance = null
export default {
  name: 'CustomTower',
  mounted () {
    this.initCanvas()
  },
  methods: {
    /**
     * @description: 初始化 Canvas
     * @param {*}
     * @return {*}
     */
    initCanvas () {
      canvasInstance = new TowerCanvas({
        mCanvas: document.getElementById('towerCanvas'),
        ctx: document.getElementById('towerCanvas').getContext('2d'),
        basePosition: { x: 150, y: 400 },
        width: 20, //  塔身每一层的宽度
        height: 30, // 塔身每一层的高度
        count: 9, // 塔身的节数
        rightLength: 220 // 右臂的长度
      })

      this.drawRect()
      this.drawLine()
      this.variousHooks()
    },

    /**
     * @description: 绘制矩形
     * @param {*}
     * @return {*}
     */
    drawRect () {
      // 左小重物
      canvasInstance.drawRect(57, 113, 9, 15, false, true, 'rgb(249,179,45)')
      canvasInstance.drawRect(67, 113, 9, 15, false, true, 'rgb(249,179,45)')
      canvasInstance.drawRect(77, 113, 9, 15, false, true, 'rgb(249,179,45)')
    },

    /**
     * @description: 绘制线段
     * @param {*}
     * @return {*}
     */
    drawLine () {
      // 塔吊尖
      canvasInstance.drawLine(150, 110, 170, 110, 1, 'rgb(249,179,45)')
      canvasInstance.drawLine(150, 110, 160, 20, 1, 'rgb(249,179,45)')
      canvasInstance.drawLine(170, 110, 160, 20, 1, 'rgb(249,179,45)')
      canvasInstance.drawLine(152, 90, 168, 90, 1, 'rgb(249,179,45)')
      canvasInstance.drawLine(155, 70, 165, 70, 1, 'rgb(249,179,45)')
      canvasInstance.drawLine(158, 50, 162, 50, 1, 'rgb(249,179,45)')

      canvasInstance.drawLine(160, 45, 85, 80, 1, 'rgb(249,179,45)')
      canvasInstance.drawLine(160, 45, 88, 80, 1, 'rgb(249,179,45)')
      canvasInstance.drawLine(160, 45, 91, 80, 1, 'rgb(249,179,45)')

      canvasInstance.drawLine(160, 45, 240, 90, 1, 'rgb(249,179,45)')
      canvasInstance.drawLine(160, 45, 243, 90, 1, 'rgb(249,179,45)')
      canvasInstance.drawLine(160, 45, 246, 90, 1, 'rgb(249,179,45)')
      canvasInstance.drawLine(160, 45, 350, 90, 1, 'rgb(249,179,45)')
      canvasInstance.drawLine(160, 45, 353, 90, 1, 'rgb(249,179,45)')
      canvasInstance.drawLine(160, 45, 356, 90, 1, 'rgb(249,179,45)')

      // 左吊臂
      canvasInstance.drawLine(55, 110, 150, 110, 1, 'rgb(249,179,45)')
      canvasInstance.drawLine(55, 110, 55, 80, 1, 'rgb(249,179,45)')
      canvasInstance.drawLine(85, 110, 85, 80, 1, 'rgb(249,179,45)')
      canvasInstance.drawLine(115, 110, 115, 80, 1, 'rgb(249,179,45)')
      canvasInstance.drawLine(145, 110, 145, 80, 1, 'rgb(249,179,45)')
      canvasInstance.drawLine(55, 100, 145, 100, 1, 'rgb(249,179,45)')
      canvasInstance.drawLine(55, 90, 145, 90, 1, 'rgb(249,179,45)')
      canvasInstance.drawLine(55, 80, 145, 80, 1, 'rgb(249,179,45)')

      // 左小重物竖线
      canvasInstance.drawLine(62, 110, 62, 130, 1, 'rgb(249,179,45)')
      canvasInstance.drawLine(72, 110, 72, 130, 1, 'rgb(249,179,45)')
      canvasInstance.drawLine(82, 110, 82, 130, 1, 'rgb(249,179,45)')
    },

    variousHooks () {
      canvasInstance.variousHooks(165, 110, 180, 240, 'rgb(249,179,45)')
    }

  }
}
</script>
