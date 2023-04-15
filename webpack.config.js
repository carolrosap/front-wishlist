const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: './src/index.ts',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.html$/, // Aplica a regra a arquivos com extensão .html
                use: [
                  {
                    loader: 'raw-loader', // Utiliza o raw-loader
                  },
                ]
            },
            {
                test: /\.scss$/, // Use expressão regular para identificar arquivos SCSS
                use: [
                  'style-loader', // Adicione o estilo ao DOM como <style> tag
                  'css-loader', // Carregue o CSS em JavaScript
                  'sass-loader' // Compile o SCSS em CSS
                ]
            },
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
            filename: 'index.html',
        }),
        new CleanWebpackPlugin(),
    ],
    devServer: {
        static: {
            directory: path.resolve(__dirname, 'public'), // Caminho para a pasta de arquivos estáticos
        },
        compress: true,
        port: 9000,
    },
    optimization: {
        minimize: true,
    },
};
