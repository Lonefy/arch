import path         from 'path';
import webpack      from 'webpack';
import autoprefixer from 'autoprefixer';
import precss       from 'precss';

const nodeModulesDir  = path.resolve(__dirname, 'node_modules');
const assetsDir  = path.resolve(__dirname, 'build/arch');
const jsPath ='http:///arch/';
// const jsPath ='http://127.0.0.1/arch/';
let config = {
    devtool: 'eval',
    entry: [
        // 'webpack-dev-server/client?http://localhost:3000',
        'webpack-dev-server/client?http://127.0.0.1',
        'webpack/hot/only-dev-server',
        path.resolve(__dirname, 'app/index.js')
    ],
    output: {
        path: assetsDir,
        filename: 'bundle.js',
        chunkFilename: '[name].chunk.[hash].js',
        publicPath: jsPath
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.ProvidePlugin({
            $: 'webpack-zepto',
            'Zepto': 'webpack-zepto'
        }),
        new webpack.ProvidePlugin({
            Swiper: 'swiper'
        })

    ],
    postcss: function () {
        return [precss, autoprefixer];
    },
    module: {
        loaders: [{
            test: /\.jsx?$/,
            loaders: ['react-hot', 'babel'],
            exclude: [nodeModulesDir],
            include: path.join(__dirname, 'app')
        }, {
            test: /\.scss$/,
            loader: 'style!css!postcss!sass'
        }, {
            test: /\.css$/,
            loader: 'style!css!postcss'
        }, {
            test: /\.json$/,
            loader: 'json'
        }, {
            test: /\.(eot|woff|woff2|ttf|svg|png|jpe?g|gif)(\?\S*)?$/,
            loader: 'url?limit=100000@name=[name][ext]'
        }]
    },
    resolve: {
        extensions: ["", ".js", ".jsx", ".scss", ".json"],
    },
    // devServer: {
    //     contentBase: '/',
    //     host: 'localhost',
    //     port: 80,
    //     inline: true,
    // },
};

export default config;

