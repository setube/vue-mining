import Vue from 'vue';
import Vuex from 'vuex';
import persistedState from 'vuex-persistedstate';

Vue.use(Vuex);

export default new Vuex.Store(
    {
        state: {
            cd: [
                { time: 0, click: true },
                { time: 0, click: true },
                { time: 0, click: true },
                { time: 0, click: true }
            ],
            grid: [],
            star: 0,
            score: 0,
            avatar: require('@/assets/images/avatar.png'),
            mapnum: 0,
            frequency: 1
        },
        mutations: {
            setCd (state, data) {
                state.cd = data;
            },
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
            setFrequency (state, data) {
                state.frequency = data;
            }
        },
        plugins: [
            persistedState({
                storage: window.localStorage,
                reducer (val) {
                    return {
                        cd: val.cd,
                        star: val.star,
                        grid: val.grid,
                        score: val.score,
                        avatar: val.avatar,
                        mapnum: val.mapnum,
                        frequency: val.frequency
                    };
                }
            })
        ]
    }
);