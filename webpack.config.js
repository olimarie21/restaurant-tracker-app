const path = require('path');
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
        mode:'development',
        entry: './src/index.js',
        output: {
            filename: 'bundle.js',
            path: path.resolve(__dirname, 'public')
        },
        devtool: 'inline-source-map',
        optimization: {
            minimize: true,
            minimizer: [new TerserPlugin()],
        },
    module: {
        rules: [
            {
                test: /\.(s(a|c)ss)$/,
                use: ['style-loader','css-loader', 'sass-loader']
            },
            {
                test: /\.m?js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react' ]
                    }
                }
            }
        ]
    }
};