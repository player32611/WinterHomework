const path = require("path");
const { merge } = require("webpack-merge");
const devConfig = require("./webpack.dev.js");
const prodConfig = require("./webpack.prod.js");
const HtmlWebpackPlugin = require('html-webpack-plugin')
const commonConfig = {
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        clean: true
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.js$/,
                use: ["babel-loader"],
                exclude: "/node_modules/",
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'webpack 案例',
            template: "./src/index.html",
        }),
    ],
    devServer: {
        static: {
            directory: path.join(__dirname, "/dist"),
        },
        port: 3000,
        hot: true,
        open: false,
    },
};
module.exports = (env) => {
    if (env && env.production) {
        return merge(commonConfig, prodConfig);
    } else {
        return merge(commonConfig, devConfig);
    }
};