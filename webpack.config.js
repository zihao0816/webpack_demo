const path  = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin } = require('clean-webpack-plugin')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')//抽离css
const OptimizeCss=require('optimize-css-assets-webpack-plugin')//压缩css
const TerserPlugin=require('terser-webpack-plugin')//压缩js

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
    
    plugins:[
        new MiniCssExtractPlugin({
            filename:'[name].css',
            chunkFilename: '[id].css',
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
        new OptimizeCss({}),//压缩css
        new TerserPlugin({})//压缩js
       
    ],
    module:{
        rules:[
            {
                test:/\.js$/,
                exclude:/node_modules/,
                use:{
                    loader:'eslint-loader',
                    options:{
                        enforce:'pre'//pre在普通loader之前，post在普通loader之后
                    }
                }
            },
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