const path  = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin } = require('clean-webpack-plugin')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')//抽离css
const OptimizeCss=require('optimize-css-assets-webpack-plugin')//压缩css
const TerserPlugin=require('terser-webpack-plugin')//压缩js
const CopyWebPackPlugin = require('copy-webpack-plugin')


module.exports = {
    mode:'development',
    entry:path.resolve(__dirname,'src/index.js'),
    output:{
        filename:'bundle.[hash].js',
        path:path.resolve(__dirname,'dist')
    },
    devServer:{
        contentBase:'./dist',//他会先从内存中找,如果没有再从当前文件中找
        open:true,
        port:3000,
        compress:true,//服务器压缩
        hot:true,
    },
    devtool:'source-map',
    // resolve:{//解析第三方模块
    //     modules:[path.resolve('node_modules')],
    //     alias:{
    //         'jquery':xx
    //     },
    //     extensions:['.js','.css','json','vue'],//自动找扩展名
    //     mainfile:[],//默认index.js
    //     mainfield:['styles','main']//主入口
    // },
    // watch:true,
    // watchOptions:{
    //     poll:1000,//每秒问我1000次
    //     aggregateTimeout:500,//防抖 我一直出入代码
    //     ignored:/node_modules/
    // },
    plugins:[
        new MiniCssExtractPlugin({
            filename:'/css/main.css',
        }),
        new webpack.HotModuleReplacementPlugin(),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            //filename:'a.html',//重命名
            template:path.resolve(__dirname,'public/index.html'),
            title:'demo学习',
            hash:true,
            // minify:{
            //     removeAttributeQuotes:true,//去掉双引号
            //     collapseWhitespace:true//折叠空行
            // }
        }),
        new CopyWebPackPlugin([
            {
                from:'doc',to:'./'
            }
        ]),
        new webpack.BannerPlugin('此代码是我所写')
        // new OptimizeCss({}),//压缩css
        // new TerserPlugin({}),//压缩js
        // new webpack.ProvidePlugin({//在某个模块中都注入$,但是在window找不到
        //     '$':jquery
        // })
       
    ],
    module:{
        rules:[
            {
                test:/\.(jpg|png|gif)$/,
                use:{
                    loader:'url-loader',
                    options:{
                        limit:200*1024,
                       outputPath:'/img/',
                        // publicPath:'https://www.zihao.com'
                    }
                }
            },
            {
                test:require.resolve("jquery"),
                use:'expose-loader?$'
            },
            // {
            //     test:/\.js$/,
            //     exclude:/node_modules/,
            //     use:{
            //         loader:'eslint-loader',
            //         options:{
            //             enforce:'pre'//pre在普通loader之前，post在普通loader之后
            //         }
            //     }
            // },
            {
                test:/\.js$/,
                exclude:/node_modules/,
                include:path.resolve(__dirname,'src'),
                use:{
                    loader:'babel-loader',
                    options:{
                        presets:['@babel/preset-env'],
                        plugins:[
                            '@babel/plugin-proposal-class-properties',
                            "@babel/plugin-transform-runtime",
                        ]
                    }
                }
            },
            {
                test:/\.css$/,
                exclude:/node_modules/,
                use:[
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader'
                ]
            },
            {
                test:/\.less$/,
                use:[
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'less-loader'
                ]
            }
        ]
    }
}