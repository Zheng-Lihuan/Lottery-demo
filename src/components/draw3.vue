<template>
  <div class="scratch-card">
    <div :style="computedBgStyle" class="scratch-card-bg">
      <div class="canvas-wrap">
        <div class="prize-wrap">
          <h2 class="prize-item">一等奖</h2>
          <p class="prize-item">新秀丽行李箱新秀丽行李箱新秀丽行李箱新秀丽行李箱</p>
        </div>
        <canvas id="canvasMask" class="canvas"></canvas>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    CTX,
    VERSION
  } from '@/constants/context'
  export default {
    props: {
      config: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        canvas: null,
        context: null,
        width: 450, // canvas宽度
        height: 250, // canvas高度
        scaleRatio: 1 // 缩放比例
      }
    },
    computed: {
      computedBgStyle() {
        if (this.config.turnTableImg) {
          return {
            'backgroundImage': `url(${this.config.turnTableImg})`
          }
        } else {
          return {
            'backgroundImage': `url(${CTX}/static/img/scratch-card/prize-bg.png?v=${VERSION})`
          }
        }
      }
    },
    mounted() {
      this.$nextTick(() => {
        const clientW = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
        this.scaleRatio = clientW / 750
        this.canvas = document.getElementById('canvasMask')
        this.canvas.width = this.width * this.scaleRatio
        this.canvas.height = this.height * this.scaleRatio
        this.context = this.canvas.getContext('2d')
        // 画灰色涂层图片
        const coatImg = new Image()
        coatImg.src = `${CTX}/static/img/scratch-card/coat-img.png?v=${VERSION}`
        coatImg.addEventListener('load', () => {
          this.context.drawImage(coatImg, 0, 0, this.canvas.width, this.canvas.height)
          // 启用了globalCompositeOperation= = 'destination-out' 之后，在 canvs 上绘制的新的图形，就会使得之前的 mask 变成透明的，从而显示出背景图片来。
          this.context.globalCompositeOperation = 'destination-out'
          // 监听touchmove
          this.canvas.addEventListener('touchmove', this.moveHandler)
        })
      })
    },
    methods: { // 手指划过 画圆
      moveHandler(event) {
        let context = this.context
        event.preventDefault()
        context.beginPath()
        // 根据某个点在canvas上画圆
        // x 坐标和 y 坐标 两个坐标是触摸点的坐标而不是画圆的圆心
        // 圆心通过计算得出
        var canvasRect = this.canvas.getBoundingClientRect()
        context.arc(event.touches[0].pageX - canvasRect.left, event.touches[0].pageY - canvasRect.top, 20 * this
          .scaleRatio, 0, Math.PI * 2)
        context.closePath()
        context.fillStyle = '#dddddd'
        context.fill()
        this.checkComplete()
      },
      // 检查完成度,判断是否完成刮奖 点数大于80%
      checkComplete() {
        var imgData = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height)
        var pxData = imgData.data // 获取字节数据
        var len = pxData.length // 获取字节长度
        var count = 0 // 记录透明点的个数
        // 主要的思想是 一个像素由四个数据组成，每个数据分别是 rgba() 所以第四个数据 a 表示alpha透明度
        for (var i = 0; i < len; i += 4) {
          var alpha = pxData[i + 3] // 获取每个像素的透明度
          if (alpha < 10) {
            // 透明度小于10
            count++
          }
        }
        var percent = count / (len / 4) // 计算百分比
        // 如果百分比大于0.8 则表示成功
        if (percent >= 0.8) {
          this.showResult()
        }
      },
      // 显示刮奖结果
      showResult() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
        alert('刮奖成功')
      }
    }
  }
</script>

<style lang="scss" scoped>
  .scratch-card {
    // width: px2rem(690px);
    // height: px2rem(546px);
    margin: 0 auto;
    position: relative;

    &-bg {
      width: 100%;
      height: 100%;
      background-size: 100% 100%;
      // padding-top: px2rem(204px);
    }
  }

  .canvas-wrap {
    // width: px2rem(504px);
    // height: px2rem(300px);
    // background-image: img-url('../../assets/img/scratch-card/bg-scratch.png');
    background-size: 100% 100%;
    margin: 0 auto;
    position: relative;
    color: #fff;
    text-align: center;

    .prize-wrap {
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      // padding: 0 px2rem(30px);
    }

    .prize-item {
      // @include font-dpr(30px);
      // @include lh-dpr(42px);
      font-weight: 600;

      &:first-child {
        // margin-bottom: px2rem(16px);
      }
    }

    .canvas {
      background-size: 100% 100%;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
  }
</style>