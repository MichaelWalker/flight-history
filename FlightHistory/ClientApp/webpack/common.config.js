import HtmlWebpackPlugin from "html-webpack-plugin";
import path from "path";
import webpack from "webpack";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
    entry: "./src/index.tsx",
    output: {
        filename: "bundle.[fullhash].js",
        path: path.resolve(__dirname, "../dist"),
        publicPath: "/",
    },
    cache: true,
    plugins: [
        new HtmlWebpackPlugin({
            template: "./index.html",
        }),
        new webpack.DefinePlugin({
            USE_SAMPLE_DATA: process.env.USE_SAMPLE_DATA || false,
        }),
    ],
    resolve: {
        // modules: [__dirname, "src", "node_modules"],
        extensions: [".js", ".jsx", ".tsx", ".ts"],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                include: path.resolve(__dirname, "../src"),
                use: ["babel-loader", "ts-loader"],
            },
            {
                test: /\.module\.scss/,
                include: path.resolve(__dirname, "../src"),
                use: [
                    "style-loader",
                    {
                        loader: "css-loader",
                        options: {
                            modules: {
                                localIdentName: "[name]__[local]__[hash:base64:5]",
                            },
                        },
                    },
                    "sass-loader",
                ],
            },
            {
                test: /\.scss$/,
                exclude: /\.module\.scss/,
                include: path.resolve(__dirname, "../src"),
                use: ["style-loader", "css-loader", "sass-loader"],
            },
        ],
    },
};
