var path = require("path")

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
    context: path.resolve(__dirname, './src'), //指向src底下的index.js
    entry: {
        index: './index.js',
        about: './about.js'
    },
    output: {
        path:path.resolve(__dirname, './dist'),
        filename: './[name].js',//跟隨key的名字
    },
    devServer: {
        compress: true,
        port: 3000,
        
    },
    // resolve: {
    //     modules: [
    //         path.resolve('src'),
    //         path.resolve('src/js'),
    //         path.resolve('src/scss'),
    //         path.resolve('src/images'),
    //         path.resolve('node_modules')
    //     ],
    //     // extensions: ['.js']
    // },
    module: {
        rules: [
            {
                test: /\.(pug)$/,
                use: ['html-loader','pug-html-loader']
            },

            {
                test: /\.html$/,
                use:[{
                    loader: 'file-loader',
                    options: {
                        name: '[path][name].[ext]'
                    }  
                }]
            },

            

            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader"
                  ]
            },
            {
                test: /\.(sass|scss)$/,
                use: [
                    //MiniCssExtractPlugin.loader,
                    'style-loader',//放到js
                    'css-loader',
                    'sass-loader'
                ]
            },
            // {
            //     test: /\.(js)$/,
            //     use: 'babel-loader'
            // },
            {
                test: /\.(jpe?g|png|gif)$/,
                type:'asset',
                // parser:{
                //     detaurlCondition:{
                //         maxSize:8192
                //     }
                // }
            },
            {
                test: /\.png$/i,
                use: 'asset/resource'
              },
              {
                test: /\.ico$/i,
                use: 'asset/inline'
              },
              {
                test: /\.text$/i,
                use: 'asset/source'
              },
            
        ]
    },

    plugins: [
        new MiniCssExtractPlugin({
          // Options similar to the same options in webpackOptions.output
          // both options are optional
          filename: "./[name].css",
          chunkFilename: "[id].css"
        }),
        new HtmlWebpackPlugin({
            title: 'pug轉換',
            filename: 'index.html',
            template: './index.pug',
            chunks: ['about' ],
        }),
    
      ]
}