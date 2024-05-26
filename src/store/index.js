import Vue from 'vue';
import Vuex from 'vuex';
import persistedState from 'vuex-persistedstate';

Vue.use(Vuex);

export default new Vuex.Store(
    {
        state: {
            grid: [],
            star: 0,
            score: 0,
            avatar: require('@/assets/images/avatar.png'),
            mapnum: 0,
            pickaxes: [
                {
                    name: '铁镐',
                    desc: '一把简单的镐，十分钟就能做出来，但是能成功挖出来的星星矿和宝石并不多！',
                    time: 0,
                    icon: require('@/assets/images/pickaxe/0.png'),
                    click: true
                },
                {
                    name: '银稿',
                    desc: '银质的镐，制作需要半小时，挖出来的星星矿和宝石至少比铁镐多！',
                    time: 0,
                    icon: require('@/assets/images/pickaxe/1.png'),
                    click: true
                },
                {
                    name: '金稿',
                    desc: '制作工艺非常难的镐，制作需要一小时，金镐能最大程度减少挖掘对星星矿和宝石造成的破坏，所以挖出来的星星矿和宝石的产量非常高！',
                    time: 0,
                    icon: require('@/assets/images/pickaxe/2.png'),
                    click: true
                }
            ],
            frequency: 1
        },
        mutations: {
            setStar (state, data) {
                state.star = data;
            },
            setGrid (state, data) {
                state.grid = data;
            },
            setScore (state, data) {
                state.score = data;
            },
            setAvatar (state, data) {
                state.avatar = data;
            },
            setMapnum (state, data) {
                state.mapnum = data;
            },
            setPickaxes (state, data) {
                state.pickaxes = data;
            },
            setFrequency (state, data) {
                state.frequency = data;
            }
        },
        plugins: [
            persistedState({
                storage: window.localStorage,
                reducer (val) {
                    return {
                        star: val.star,
                        grid: val.grid,
                        score: val.score,
                        avatar: val.avatar,
                        mapnum: val.mapnum,
                        pickaxes: val.pickaxes,
                        frequency: val.frequency
                    };
                }
            })
        ]
    }
);