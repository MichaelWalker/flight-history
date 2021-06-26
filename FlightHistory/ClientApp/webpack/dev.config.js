import CommonConfig from "./common.config.js";

export default {
    ...CommonConfig,
    mode: "development",
    devtool: "eval-cheap-source-map",
    devServer: {
        historyApiFallback: true,
    },
};
