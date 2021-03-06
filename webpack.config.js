const path = require('path');
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
        mode:'production',
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
                use: ['style-loader','css-loader', {
                    loader: 'sass-loader',
                  },
                ]
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/i,
                use: [
                  {
                    loader: 'file-loader',
                  },
                ],
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