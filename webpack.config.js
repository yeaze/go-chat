const path = require('path');
const webpack = require('webpack');

module.exports = {
    // 入口文件
    entry: './src/main.js',
    output: {
        // 打包后输出的目录
        path: path.resolve(__dirname, './dist'),
        // 打包后资源文件的前缀
        publicPath: '/dist/',
        filename: 'build.js'
    },
    resolve: {
        // require时省略的扩展名，如：require('module') 不需要module.js
        extensions: ['.js', '.vue'],
        // 别名
        alias: {
            components: path.join(__dirname, './src/components'),
            'vue$': 'vue/dist/vue.esm.js'
        },
    },
    // 处理不同后缀的文件
    module: {
        rules: [{
            test: /\.vue$/,
            use: 'vue-loader'
        }, {
            test: /\.js$/,
            use: 'babel-loader',
            exclude: /node_modules/
        }, {
            test: /\.css$/,
            use: ['vue-style-loader', 'css-loader']
        }, {
            test: /\.less$/,
            use: ['vue-style-loader', 'css-loader', 'less-loader']
        }, {
            test: /\.(png|jpg|gif|svg)$/,
            use: {
                loader: 'file',
                options: {
                    name: '[name].[ext]?[hash]'
                }
            }
        }]
    },
    // webpack-dev-server配置
    devServer: {
        historyApiFallback: true,
        noInfo: true
    },
    // 开启source-map，webpack有多种source-map，在官网文档可以查到
    devtool: '#eval-source-map'
};

// 生产环境，运行npm run build则执行这里
if (process.env.NODE_ENV === 'production') {
    module.exports.devtool = '#source-map';
    // http://vue-loader.vuejs.org/en/workflow/production.html
    module.exports.plugins = (module.exports.plugins || []).concat([
        // 环境变量
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        // 压缩代码
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ]);
}