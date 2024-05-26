module.exports = {
    parallel: true,
    publicPath: './',
    productionSourceMap: false,
    chainWebpack: config => {
        config.plugin('html').tap(args => {
            args[0].title = 'Vue 挖矿小游戏';
            return args;
        });
    }
};