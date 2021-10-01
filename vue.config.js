const path = require('path')
function resolve(dir) {
    return path.join(__dirname, dir)
}
const port = process.env.port || process.env.npm_config_port || 9527 // dev port
module.exports = {
    /**
     * You will need to set publicPath if you plan to deploy your site under a sub path,
     * for example GitHub Pages. If you plan to deploy your site to https://foo.github.io/bar/,
     * then publicPath should be set to "/bar/".
     * In most cases please use '/' !!!
     * Detail: https://cli.vuejs.org/config/#publicpath
     */
    publicPath: './',
    outputDir: '../teleAdmin/player',
    assetsDir: 'static',
    lintOnSave: process.env.NODE_ENV === 'development', //production development
    productionSourceMap: false,
    devServer: {
        port: port,
        open: true,
        proxy: {
            'api': {
                target: `http://127.0.0.1:881/api`,
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        },
        overlay: {
            warnings: false,
            errors: true
        }
        // before: require('./mock/mock-server.js')
    },
    configureWebpack: {
        // provide the app's title in webpack's name field, so that
        // it can be accessed in index.html to inject the correct title.
        name: 'PLAYER',

        resolve: {
            alias: {
                '@': resolve('src')
            }
        }
    }
}
