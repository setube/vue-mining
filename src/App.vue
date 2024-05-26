<template>
    <div id="app">
        <a href="https://github.com/setube/vue-mining" class="github-corner" aria-label="View source on GitHub">
            <svg width="80" height="80" viewBox="0 0 250 250" style="fill:#151513; color:#fff; position: absolute; top: 0; border: 0; right: 0;" aria-hidden="true">
                <path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z"></path>
                <path d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2" fill="currentColor" style="transform-origin: 130px 106px;" class="octo-arm"></path>
                <path d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z" fill="currentColor" class="octo-body"></path>
            </svg>
        </a>
        <div class="common_body">
            <h5 class="common_title">Vue 挖矿小游戏</h5>
            <h6 class="common_title_tips">当前挖矿分数: {{ score }} | 目前你已挖完矿区{{ $store.state.mapnum }}次</h6>
            <div class="card_box">
                <div v-for="(item, key) in grid" :key="key" class="card_item" @click="dig(item)" @contextmenu.prevent="flag(item)" @contextmenu="flag(item)">
                    <div :class="['card_bg', 'open', item.type]" v-if="item.type === 'success' || item.type === 'error'">
                        <el-tooltip effect="dark" placement="top">
                            <div slot="content">挖取片矿区你获得了{{ item.score }}分, {{ item.type === 'success' ? '恭喜你挖到了宝贵的星星矿石' : '但是这里并不存在矿石' }}</div>
                            <div>
                                <span v-if="item.type === 'error'">{{ item.score }}</span>
                                <span v-else>★</span>
                                <img src="@/assets/images/avatar.png" class="avatar" />
                            </div>
                        </el-tooltip>
                    </div>
                    <div class="card_bg" v-else>
                        <img :src="map" class="card_img" />
                    </div>
                </div>
            </div>
            <div class="card_demining_tool_body">
                <div class="demin_tool_hooper hooper">
                    <div class="hooper-list">
                        <ul class="hooper-track">
                            <li class="hooper-slide">
                                <div class="demin_tool_hooper_item_body clearfix">
                                    <div class="card_pickaxe_body" v-for="(item, index) in pickaxes" :key="index" @click="clickPickaxe(index)">
                                        <el-popover placement="top-start" :title="item.name" width="200" trigger="hover" :content="item.desc">
                                            <div :class="['card_pickaxe_ico', { active: pickaxe === index }]" slot="reference">
                                                <img :src="item.icon">
                                            </div>
                                            <div class="card_demining_time_body" slot="reference">
                                                <span v-if="!item.click">
                                                    <el-statistic @finish="pickaxeFinish" format="mm:ss" :value="item.time" time-indices></el-statistic>
                                                </span>
                                                <span v-else>完成！</span>
                                            </div>
                                        </el-popover>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div class="bg_1"></div>
        <div class="bg_2"></div>
    </div>
</template>

<script>
    import { Message } from 'element-ui';

    export default {
        data () {
            return {
                map: [
                    {
                        icon: require('@/assets/images/map/bg1.png')
                    },
                    {
                        icon: require('@/assets/images/map/bg2.png')
                    },
                    {
                        icon: require('@/assets/images/map/bg3.png')
                    },
                    {
                        icon: require('@/assets/images/map/bg4.png')
                    },
                    {
                        icon: require('@/assets/images/map/bg5.png')
                    },
                    {
                        icon: require('@/assets/images/map/bg6.png')
                    },
                    {
                        icon: require('@/assets/images/map/bg7.png')
                    },
                    {
                        icon: require('@/assets/images/map/bg8.png')
                    },
                    {
                        icon: require('@/assets/images/map/bg9.png')
                    },
                    {
                        icon: require('@/assets/images/map/bg10.png')
                    },
                    {
                        icon: require('@/assets/images/map/bg11.png')
                    },
                    {
                        icon: require('@/assets/images/map/bg12.png')
                    },
                    {
                        icon: require('@/assets/images/map/bg13.png')
                    },
                    {
                        icon: require('@/assets/images/map/bg14.png')
                    },
                    {
                        icon: require('@/assets/images/map/bg15.png')
                    },
                    {
                        icon: require('@/assets/images/map/bg16.png')
                    },
                    {
                        icon: require('@/assets/images/map/bg17.png')
                    }
                ],
                grid: [],
                mines: 30,
                score: 0,
                pickaxe: 0,
                pickaxes: [],
                frequency: 0,
                minePositions: [],
                currentTimeStamp: 0
            }
        },
        created () {
            this.initGrid();
            this.map = this.map[this.frequency].icon;
            this.score = this.$store.state.score;
            this.pickaxes = this.$store.state.pickaxes;
            this.frequency = this.$store.state.frequency;
            this.currentTimeStamp = new Date().getTime();
        },
        methods: {
            pickaxeFinish () {
                this.pickaxes[this.pickaxe].click = true;
                this.$store.commit('setPickaxes', this.pickaxes);
            },
            clickPickaxe (index) {
                this.pickaxe = index;
            },
            initGrid () {
                if (this.$store.state.grid.length) {
                    this.grid = this.$store.state.grid;
                } else {
                    for (let i = 0; i < 225; i++) {
                        this.grid.push({ id: i, type: '', mined: false, flagged: false, score: 0 });
                    }
                }
                this.placeMines();
            },
            placeMines () {
                let placedMines = new Set();
                while (placedMines.size < this.mines) {
                    let index = Math.floor(Math.random() * this.grid.length);
                    if (!placedMines.has(index)) {
                        placedMines.add(index);
                        this.grid[index].mined = true;
                        this.minePositions.push(index);
                    }
                }
            },
            dig (item) {
                if (!item.flagged && this.pickaxes[this.pickaxe].click) {
                    item.type = item.mined ? 'success' : 'error';
                    if (this.pickaxe == 0) {
                        item.score += 1;
                        this.pickaxes[this.pickaxe].time = this.currentTimeStamp + 10 * 60 * 1000;
                        this.pickaxes[this.pickaxe].click = false;
                    } else if (this.pickaxe == 1) {
                        item.score += 2;
                        this.pickaxes[this.pickaxe].time = this.currentTimeStamp + 30 * 60 * 1000;
                        this.pickaxes[this.pickaxe].click = false;
                    } else {
                        item.score += 3;
                        this.pickaxes[this.pickaxe].time = this.currentTimeStamp + 60 * 60 * 1000;
                        this.pickaxes[this.pickaxe].click = false;
                    }
                    item.flagged = true;
                    this.score += item.score;
                    this.$store.commit('setGrid', this.grid);
                    this.$store.commit('setScore', this.score);
                    this.$store.commit('setPickaxes', this.pickaxes);
                    this.checkAllCleared();
                }
            },
            showMinePositions () {
                this.showMines = true;
                this.grid.forEach((cell, index) => {
                    if (this.minePositions.includes(index)) cell.type = 'success';
                });
            },
            getAdjacentItems (itemId) {
                let x = itemId % 15;
                let y = Math.floor(itemId / 15);
                let adjacentItems = [];
                for (let i = -1; i <= 1; i++) {
                    for (let j = -1; j <= 1; j++) {
                        let col = (x + i + 15) % 15;
                        let row = (y + j + 15) % 15;
                        let id = col + row * 15;
                        if (id !== itemId) adjacentItems.push(this.grid[id]);
                    }
                }
                return adjacentItems;
            },
            flag (item) {
                item.flagged = !item.flagged;
            },
            checkAllCleared () {
                const allCellsDug = this.grid.every(item => item.type !== '');
                const allMinesFlagged = this.grid.every(item => !item.mined || item.flagged);
                if (allMinesFlagged || allCellsDug) {
                    Message({
                        message: `恭喜你，所有${allMinesFlagged ? '矿石' : '矿区'}都已被挖完！`,
                        type: 'success'
                    });
                    this.initGrid();
                    this.mapnum++;
                    this.frequency++;
                    if (this.frequency === 17) this.frequency = 0;
                    this.$store.commit('setMapnum', this.mapnum);
                    this.$store.commit('setFrequency', this.frequency);
                }
            },
        }
    }
</script>

<style scoped>
    .bg_1,
    .bg_2 {
        position: fixed;
        top: 0;
        left: 0;
        z-index: -1;
        width: 100%;
        height: 100%;
        background-size: 100% auto;
        transition: all .3s ease-out;
    }

    .bg_1 {
        background: url(@/assets/images/bg/bg1.png) top;
    }

    .bg_2 {
        background: url(@/assets/images/bg/bg2.png) top;
    }

    .github-corner:hover .octo-arm {
        animation: octocat-wave 560ms ease-in-out
    }

    @keyframes octocat-wave {

        0%,
        100% {
            transform: rotate(0)
        }

        20%,
        60% {
            transform: rotate(-25deg)
        }

        40%,
        80% {
            transform: rotate(10deg)
        }
    }

    @media (max-width:500px) {
        .github-corner:hover .octo-arm {
            animation: none
        }

        .github-corner .octo-arm {
            animation: octocat-wave 560ms ease-in-out
        }
    }

    .common_body {
        padding: 0 0 20px;
        margin: 0 auto;
        max-width: 660px;
        overflow: hidden;
    }

    .common_title {
        font-size: 22px;
        line-height: 32px;
        text-align: center;
    }

    .common_title_tips {
        text-align: center;
        font-size: 14px;
        padding-bottom: 5px;
        margin-top: -10px;
    }

    .card_box {
        display: flex;
        flex-wrap: wrap;
        width: 100%;
        justify-content: center;
        align-items: center;
    }

    .card_item {
        width: 40px;
        background-color: #ddd;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        border: 1px solid #fff;
    }

    .card_bg {
        width: 40px;
        height: 40px;
        text-align: center;
        line-height: 40px;
        position: relative;
        z-index: 1;
        font-size: 18px;
        user-select: none;
        image-rendering: pixelated;
        background-color: #464646;
        text-shadow: 0 0 5px #000;
        cursor: url(@/assets/images/cur/pointer.cur), default;
    }

    .open {
        background-color: #a4a4a4;
        background-image: none;
        box-sizing: border-box;
        border: 1px solid #727272;
    }

    .open.success {
        color: #ffc800;
    }

    .open.error {
        color: #fff;
    }

    .avatar {
        width: 40px;
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        opacity: .2;
        image-rendering: auto;
    }

    .card_item:hover .avatar {
        opacity: 1;
    }

    .card_img {
        width: 40px;
    }

    .card_demining_tool_body {
        position: fixed;
        background-color: #fff;
        z-index: 2;
        bottom: 5px;
        border-radius: 5px;
        left: 50%;
        transform: translateX(-120px);
        width: 240px;
        height: 62px;
        box-shadow: 0 0 5px rgba(0, 0, 0, .3);
    }

    .hooper {
        position: relative;
        box-sizing: border-box;
        width: 100%;
        height: 200px;
    }

    .card_demining_tool_body .demin_tool_hooper {
        height: 100%;
    }

    .hooper-list {
        overflow: hidden;
        width: 100%;
        height: 100%;
    }

    .hooper-track {
        display: flex;
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        padding: 0;
        margin: 0;
    }

    .hooper-slide {
        flex-shrink: 0;
        height: 100%;
        margin: 0;
        padding: 0;
        width: 240px;
        list-style: none;
    }

    .demin_tool_hooper_item_body {
        width: 216px;
        margin: 0 auto;
    }

    .card_pickaxe_body {
        width: 48px;
        float: left;
        margin: 8px 12px 0;
        transition: all .3s linear;
        text-align: center;
    }

    .card_pickaxe_ico {
        opacity: .3;
        height: 32px;
        margin-bottom: 4px;
    }

    .card_pickaxe_ico.active,
    .card_pickaxe_ico:hover {
        opacity: 1;
    }

    .card_demining_time_body {
        font-size: 12px;
        line-height: 14px;
    }

    .clearfix:after {
        content: ".";
        display: block;
        height: 0;
        clear: both;
        visibility: hidden;
    }
</style>

<style>
    body,
    html {
        font-size: 14px;
        font-family: -apple-system, BlinkMacSystemFont, Helvetica Neue, PingFang SC, Microsoft YaHei, Source Han Sans SC, Noto Sans CJK SC, WenQuanYi Micro Hei, sans-serif;
        color: #14191e;
    }

    body {
        overflow-x: hidden;
        overflow-y: auto;
    }

    body {
        cursor: url(@/assets/images/cur/default.cur), default;
        background-image: url(@/assets/images/bg/bg0.png);
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
        font-size: 100%;
        font-weight: 400;
    }

    #app {
        overflow-x: hidden;
    }

    .el-statistic .con .number {
        font-size: 12px !important;
        line-height: 14px;
    }
</style>