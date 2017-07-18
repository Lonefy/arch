/* eslint no-var:0 */
/* eslint no-console:0 */
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import config from './webpack.dev.reload.config';

const server = new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    hot: true,
    historyApiFallback: true,
    disableHostCheck: true,
});
server.listen(80, (err) => {
    if (err) {
        console.log(err);
    }
    console.log('Listening at http://127.0.0.1');
});
// server.listen(3000, (err) => {
//   if (err) {
//     console.log(err);
//   }
//   console.log('Listening at http://127.0.0.1:3000');
// });