<template>
    <div class="about">
        <div id="app">
            <span>Prize number: {{ prizeNumber }}</span>
            <button type="button" @click="!rolling && prizeNumber < 8 && (prizeNumber++)"
                    :disabled="rolling || prizeNumber === 8">Add
            </button>
            <button type="button" @click="!rolling && prizeNumber > 2 && (prizeNumber--)"
                    :disabled="rolling || prizeNumber === 2">Remove
            </button>
            <div class="wheel-wrapper">
                <div class="wheel-pointer" @click="onClickRotate">Start</div>
                <div class="wheel-bg" :class="{freeze: freeze}" :style="`transform: rotate(${wheelDeg}deg)`">
                    <div class="prize-list">
                        <div class="prize-item-wrapper" v-for="(item,index) in prizeList" :key="index">
                            <div class="prize-item" :style="`transform: rotate(${(360/ prizeList.length) * index}deg)`">
                                <div class="prize-name">
                                    {{ item.name }}
                                </div>
                                <div class="prize-icon">
                                    <img :src="item.icon">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'draw1',
        data() {
            return {
                freeze: false,//转盘是否可点击旋转
                rolling: false,//转盘是够再转动
                wheelDeg: 0,//转盘的旋转角度
                prizeNumber: 6,//转盘的奖励项个数
                prizeListOrigin: [
                    {
                        icon: "https://picsum.photos/40?random=1",
                        name: "$10000"
                    },
                    {
                        icon: "https://picsum.photos/40?random=6",
                        name: "Thank you!_1"
                    },
                    {
                        icon: "https://picsum.photos/40?random=2",
                        name: "$500"
                    },
                    {
                        icon: "https://picsum.photos/40?random=3",
                        name: "$100"
                    },
                    {
                        icon: "https://picsum.photos/40?random=6",
                        name: "Thank you!_2"
                    },
                    {
                        icon: "https://picsum.photos/40?random=4",
                        name: "$50"
                    },
                    {
                        icon: "https://picsum.photos/40?random=5",
                        name: "$10"
                    },
                    {
                        icon: "https://picsum.photos/40?random=6",
                        name: "Thank you!_3"
                    }
                ]
            };
        },
        computed: {
            prizeList() {
                return this.prizeListOrigin.slice(0, this.prizeNumber)
            }
        },
        methods: {
            onClickRotate() {
                //防止多次点击开始按钮
                if (this.rolling) {
                    return;
                }
                this.rolling = true;
                console.log('this',this);
                const {wheelDeg, prizeList} = this;
                const random = Math.floor(Math.random() * (prizeList.length));
                console.log('random',random);   
                this.wheelDeg =
                    wheelDeg -
                    wheelDeg % 360 +
                    6 * 360 +
                    (360 - 360 / prizeList.length * random);
                let a=this.wheelDeg%360;
                console.log('旋转的角度',a);
                setTimeout(() => {
                    this.rolling = false;
                    alert("Result：" + prizeList[random].name);
                }, 4500);
            }
        },
        watch: {
            prizeNumber() {
                this.freeze = true
                this.wheelDeg = 0

                setTimeout(() => {
                    this.freeze = false
                }, 0)
            }
        }
    }
</script>

<style>
    html {
        background: #DD7C7D;
    }

    .wheel-wrapper {
        width: 300px;
        height: 300px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    .wheel-pointer {
        width: 60px;
        height: 60px;
        border-radius: 1000px;
        background: yellow;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        text-align: center;
        line-height: 60px;
        z-index: 10;
    }

    .wheel-bg {
        width: 100%;
        height: 100%;
        border-radius: 1000px;
        overflow: hidden;
        transition: transform 4s ease-in-out;
        background: #7EEF97;
    }

    .freeze {
        transition: none;
        background: red;
    }

    .prize-list {
        width: 100%;
        height: 100%;
        position: relative;
        text-align: center;
    }

    .prize-item-wrapper {
        position: absolute;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 150px;
        height: 150px;
    }

    .prize-item {
        width: 100%;
        height: 100%;
        transform-origin: bottom;
    }

    .prize-name {
        padding: 16px 0;
    }

    .prize-icon {
    }


   /*  freeze: false,//转盘是否可点击旋转
                rolling: false,//转盘是够再转动
                wheelDeg: 0,//转盘的旋转角度
                prizeNumber: 6,//转盘的奖励项个数 */

</style>
