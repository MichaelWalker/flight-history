const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: "./src/index.tsx",
    output: {
        filename: 'bundle.[fullhash].js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/'
    },
    cache: true,
    devtool: 'eval-cheap-source-map',
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html',
            
        }),
        new webpack.DefinePlugin({
            USE_SAMPLE_DATA: process.env.USE_SAMPLE_DATA || false,
        })
    ],
    resolve: {
        modules: [__dirname, 'src', 'node_modules'],
        extensions: ['.js', '.jsx', '.tsx', '.ts'],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                include: path.resolve(__dirname, 'src'),
                use: ['babel-loader', 'ts-loader']
            },
            {
                test: /\.module\.scss/,
                include: path.resolve(__dirname, 'src'),
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                localIdentName: "[name]__[local]__[hash:base64:5]"
                            },
                        }
                    },
                    'sass-loader',
                ]
            },
            {
                test: /\.scss$/,
                exclude: /\.module\.scss/,
                include: path.resolve(__dirname, 'src'),
                use: ['style-loader','css-loader', 'sass-loader']
            },
        ]
    },
    devServer: {
        historyApiFallback: true
    }
};
