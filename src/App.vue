<template>
    <div id="app">
        <a href="https://github.com/setube/vue-mining" class="github-corner" aria-label="View source on GitHub">
            <svg width="80" height="80" viewBox="0 0 250 250" style="fill:#151513; color:#fff; position: absolute; top: 0; border: 0; right: 0; z-index: 2;" aria-hidden="true">
                <path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z"></path>
                <path d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2" fill="currentColor" style="transform-origin: 130px 106px;" class="octo-arm"></path>
                <path d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z" fill="currentColor" class="octo-body"></path>
            </svg>
        </a>
        <div class="card_top_userinfo_body clearfix">
            <div class="fl">
                <img :src="avatar" class="top_info_avatar_pic" @click="showdialog">
            </div>
            <div class="fl">
                <div>
                    <span>我 </span>
                    <span><span class="top_info_star">★</span>{{ star }}</span>
                </div>
            </div>
        </div>
        <div class="common_body">
            <h5 class="common_title">Vue 挖矿小游戏</h5>
            <h6 class="common_title_tips">当前挖矿分数: {{ score }} | 目前你已挖完矿区{{ $store.state.mapnum }}次</h6>
            <div class="card_box">
                <div v-for="(item, key) in grid" :key="key" class="card_item" @click="dig(item)" @contextmenu.prevent="flag(item)" @contextmenu="flag(item)">
                    <div :class="['card_bg', 'open', item.type]" v-if="item.type === 'success' || item.type === 'error'">
                        <el-tooltip effect="dark" placement="top">
                            <div slot="content" class="content">
                                <div class="desc">挖取这座矿区你获得了{{ item.score }}分</div>
                                <div class="desc">{{ item.type === 'success' ? '恭喜你挖到了宝贵的星星矿石' : item.mines ? '探测器检测到周围有' + item.mines + '座星星矿' : '探测器未检测到周围有星星矿' }}</div>
                            </div>
                            <div>
                                <span v-if="item.type === 'error'">{{ item.mines }}</span>
                                <span v-else>★</span>
                                <img :src="avatar" class="avatar" />
                            </div>
                        </el-tooltip>
                    </div>
                    <div :class="['card_bg', 'map-' + frequency]" v-else></div>
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
                                                    <el-statistic @finish="pickaxeFinish(index)" format="mm:ss" :value="item.time" time-indices></el-statistic>
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
        <el-dialog title="我的信息" :visible.sync="dialogVisible" width="95%" class="dialog">
            <div class="top_info_more_body">
                <div class="top_moreinfo_avatar_pic_body set_pointer">
                    <img :src="avatar" class="top_moreinfo_avatar_pic">
                </div>
                <div class="top_moreinfo_name">我</div>
                <div class="top_moreinfo_body clearfix">
                    <div class="top_moreinfo_box">
                        <div class="top_moreinfo_label">星星：{{ star }}</div>
                    </div>
                    <div class="top_moreinfo_box">
                        <div class="top_moreinfo_label">等级：{{ mapnum }}</div>
                    </div>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <div class="upload">
                    <el-upload action="#" class="item" :http-request="httpRequest" :show-file-list="false">
                        <el-button type="primary">修改头像</el-button>
                    </el-upload>
                    <el-upload action="#" class="item" :http-request="importdata" :show-file-list="false">
                        <el-button type="info">导入</el-button>
                    </el-upload>
                    <el-button type="warning" class="item" @click="exportdata">导出</el-button>
                    <el-button type="danger" class="item" @click="clear">清空</el-button>
                </div>
            </span>
        </el-dialog>
        <el-dialog title="数据清空提示" :visible.sync="clearshow" width="30%">
            <span>清空数据属于危险操作, 请问是否要清空数据?</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="clear">取消</el-button>
                <el-button type="primary" @click="cleardata">确定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import { Message } from 'element-ui';

    export default {
        data () {
            return {
                grid: [],
                star: 0,
                mines: 30,
                score: 0,
                avatar: '',
                mapnum: 0,
                pickaxe: 0,
                pickaxes: [],
                clearshow: false,
                frequency: 0,
                minePositions: [],
                dialogVisible: false,
                currentTimeStamp: 0
            }
        },
        created () {
            this.initGrid();
            this.userinfo();
        },
        methods: {
            importdata (data) {
                const file = data.file;
                const reader = new FileReader();
                reader.onload = (e) => {
                    try {
                        const data = JSON.parse(e.target.result);
                        this.$store.commit('setStar', data.star);
                        this.$store.commit('setGrid', data.grid);
                        this.$store.commit('setScore', data.score);
                        this.$store.commit('setMapnum', data.mapnum);
                        this.$store.commit('setAvatar', data.avatar);
                        this.$store.commit('setPickaxes', data.pickaxes);
                        this.$store.commit('setFrequency', data.frequency);
                        location.reload();
                    } catch (err) {
                        Message.error('数据导入失败, 错误信息:' + err);
                    }
                };
                reader.readAsText(file);
            },
            exportdata () {
                const blob = new Blob([localStorage.getItem('vuex')], { type: 'application/json;charset=utf-8' });
                const url = URL.createObjectURL(blob);
                const downloadLink = document.createElement('a');
                downloadLink.href = url;
                downloadLink.download = '挖矿小游戏导出的数据.json';
                document.body.appendChild(downloadLink);
                downloadLink.click();
                document.body.removeChild(downloadLink);
            },
            clear () {
                this.clearshow = !this.clearshow;
            },
            cleardata () {
                localStorage.removeItem('vuex');
                location.reload();
            },
            userinfo () {
                this.star = this.$store.state.star;
                this.score = this.$store.state.score;
                this.avatar = this.$store.state.avatar;
                this.pickaxes = this.$store.state.pickaxes;
                this.frequency = this.$store.state.frequency;
                this.currentTimeStamp = new Date().getTime();
            },
            httpRequest (data) {
                const _this = this;
                const reader = new FileReader();
                const file = data.file;
                reader.readAsDataURL(file);
                reader.onloadend = (e) => {
                    try {
                        const img = new Image();
                        img.onload = () => {
                            const newWidth = 100;
                            const aspectRatio = img.width / img.height;
                            const newHeight = newWidth / aspectRatio;
                            const canvas = document.createElement('canvas');
                            const ctx = canvas.getContext('2d');
                            canvas.width = newWidth;
                            canvas.height = newHeight;
                            ctx.drawImage(img, 0, 0, newWidth, newHeight);
                            const newImageUrl = canvas.toDataURL('image/jpeg');
                            _this.avatar = newImageUrl;
                            this.$store.commit('setAvatar', newImageUrl);
                        }
                        img.src = e.target.result;
                        Message({
                            message: '头像修改成功~',
                            type: 'success'
                        });
                    } catch (err) {
                        Message.error('头像修改失败, 错误信息:' + err);
                    }
                };
                reader.readAsDataURL(file);
            },
            showdialog () {
                this.dialogVisible = !this.dialogVisible;
            },
            pickaxeFinish (index) {
                this.pickaxes[index].click = true;
                this.$store.commit('setPickaxes', this.pickaxes);
            },
            clickPickaxe (index) {
                this.pickaxe = index;
            },
            initGrid () {
                if (this.$store.state.grid.length) this.grid = this.$store.state.grid;
                else for (let i = 0; i < 225; i++) this.grid.push({ id: i, type: '', mined: false, flagged: false, score: 0, mines: 0 });
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
            countAdjacentMines (data, id, gridSize) {
                const rowIndex = Math.floor(id / gridSize);
                const colIndex = id % gridSize;
                const directions = [[-1, 0], [1, 0], [0, -1], [0, 1], [-1, -1], [-1, 1], [1, -1], [1, 1]];
                let mineCount = 0;
                for (const [rowOffset, colOffset] of directions) {
                    const newRowIndex = rowIndex + rowOffset;
                    const newColIndex = colIndex + colOffset;
                    if (newRowIndex >= 0 && newRowIndex < gridSize && newColIndex >= 0 && newColIndex < gridSize) {
                        const adjacentId = newRowIndex * gridSize + newColIndex;
                        if (data[adjacentId].mined) mineCount++;
                    }
                }
                return mineCount;
            },
            dig (item) {
                if (!item.flagged && this.pickaxes[this.pickaxe].click) {
                    const adjacentMines = this.countAdjacentMines(this.grid, item.id, 15);
                    this.pickaxes[this.pickaxe].mines = adjacentMines === 0 ? '' : adjacentMines.toString();
                    if (item.mined) {
                        this.star++;
                        item.type = 'success';
                        this.$store.commit('setStar', this.star);
                    } else {
                        item.type = 'error';
                    }
                    Message({
                        message: item.type == 'success' ? `恭喜你，挖到了宝贵的星星矿石，${item.mines ? '同时探测器检测到周围有' + item.mines + '座星星矿' : '探测器未检测到周围有星星矿'}` : `你没有挖到星星矿石，${item.mines ? '同时探测器检测到周围有' + item.mines + '座星星矿' : '探测器未检测到周围有星星矿'}`,
                        type: 'success'
                    });
                    let scoreIncrement;
                    let timeIncrement;
                    switch (this.pickaxe) {
                        case 0:
                            scoreIncrement = 1;
                            timeIncrement = 10 * 60 * 1000;
                            break;
                        case 1:
                            scoreIncrement = 2;
                            timeIncrement = 30 * 60 * 1000;
                            break;
                        default:
                            scoreIncrement = 3;
                            timeIncrement = 60 * 60 * 1000;
                    }
                    item.score += scoreIncrement;
                    this.pickaxes[this.pickaxe].time = this.currentTimeStamp + timeIncrement;
                    this.pickaxes[this.pickaxe].click = false;
                    item.flagged = true;
                    this.score += item.score;
                    this.$store.commit('setGrid', this.grid);
                    this.$store.commit('setScore', this.score);
                    this.$store.commit('setPickaxes', this.pickaxes);
                    this.checkAllCleared();
                }
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

    .card_top_userinfo_body {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 40px;
        z-index: 1;
        background-color: hsla(0, 0%, 100%, .8);
        box-shadow: 0 1px 2px rgba(0, 0, 0, .1);
        line-height: 40px;
        font-size: 14px;
    }

    .clearfix {
        zoom: 1;
    }

    .fl {
        float: left;
    }

    .top_info_avatar_pic {
        width: 30px;
        height: 30px;
        margin: 5px 10px 0 5px;
        cursor: url(@/assets/images/cur/pointer.png), pointer;
        display: block;
        background-color: #ccc;
        border-radius: 50%;
    }

    .top_info_star {
        color: #ffc800;
    }

    .top_info_more_body {
        text-align: center;
    }

    .top_moreinfo_avatar_pic_body {
        position: relative;
        width: 50px;
        height: 50px;
        margin: 0 auto;
    }

    .top_moreinfo_avatar_pic {
        width: 50px;
        height: 50px;
        border-radius: 5px;
        background-color: #ccc;
    }

    .top_moreinfo_name {
        font-size: 14px;
        line-height: 24px;
    }

    .top_moreinfo_body {
        margin-top: 10px;
        font-size: 14px;
        line-height: 36px;
    }

    .top_moreinfo_box {
        width: 180px;
        margin: 4px 2px;
        border: 1px solid #ccc;
        display: inline-block;
        border-radius: 5px;
    }

    .dialog-footer {
        text-align: center;
    }

    .upload {
        display: flex;
        justify-content: center;
    }

    .upload .item+.item {
        margin-left: 15px;
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
        background-size: cover;
        image-rendering: pixelated;
        background-color: #464646;
        text-shadow: 0 0 5px #000;
        cursor: url(@/assets/images/cur/pointer.png), default;
    }


    .card_bg.map-1 {
        background-image: url(@/assets/images/map/bg1.png);
    }

    .card_bg.map-2 {
        background-image: url(@/assets/images/map/bg2.png);
    }

    .card_bg.map-3 {
        background-image: url(@/assets/images/map/bg3.png);
    }

    .card_bg.map-4 {
        background-image: url(@/assets/images/map/bg4.png);
    }

    .card_bg.map-5 {
        background-image: url(@/assets/images/map/bg5.png);
    }

    .card_bg.map-6 {
        background-image: url(@/assets/images/map/bg6.png);
    }

    .card_bg.map-7 {
        background-image: url(@/assets/images/map/bg7.png);
    }

    .card_bg.map-8 {
        background-image: url(@/assets/images/map/bg8.png);
    }

    .card_bg.map-9 {
        background-image: url(@/assets/images/map/bg9.png);
    }

    .card_bg.map-10 {
        background-image: url(@/assets/images/map/bg10.png);
    }

    .card_bg.map-11 {
        background-image: url(@/assets/images/map/bg11.png);
    }

    .card_bg.map-12 {
        background-image: url(@/assets/images/map/bg12.png);
    }

    .card_bg.map-13 {
        background-image: url(@/assets/images/map/bg13.png);
    }

    .card_bg.map-14 {
        background-image: url(@/assets/images/map/bg14.png);
    }

    .card_bg.map-15 {
        background-image: url(@/assets/images/map/bg15.png);
    }

    .card_bg.map-16 {
        background-image: url(@/assets/images/map/bg16.png);
    }

    .card_bg.map-17 {
        background-image: url(@/assets/images/map/bg17.png);
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

    .content {
        text-align: center;
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
        cursor: url(@/assets/images/cur/default.png), default;
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

    .el-button,
    .el-dialog__headerbtn,
    .el-input-number__decrease,
    .el-input-number__increase,
    .el-pager li,
    .wm_set_pointer,
    a,
    button {
        cursor: url(@/assets/images/cur/pointer.png), pointer !important;
    }

    .el-dialog {
        max-width: 400px;
        margin: 0 auto;
    }
</style>