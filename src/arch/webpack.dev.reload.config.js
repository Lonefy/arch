import path from 'path';
import webpack from 'webpack';
import autoprefixer from 'autoprefixer';
import precss from 'precss';

const nodeModulesDir = path.resolve(__dirname, 'node_modules');
const assetsDir = path.resolve(__dirname, 'build/arch');
const localDev = true;
const jsPath = localDev ? 'http://localhost/build/arch/' : 'http://domain/arch/';

let config = {
    devtool: 'eval',
    entry: [
        'webpack-dev-server/client?' + (localDev ? 'http://localhost' : 'http://domain'),
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

};
Object.assign(config, localDev && {
        devServer: {
            contentBase: '/',
            host: 'localhost',
            port: 80,
            inline: true
        }
    })
export default config;

