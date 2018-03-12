var path = require('path');

module.exports = {
    devtool: 'eval-source-map',
    entry: path.resolve(__dirname, 'src', 'index.js'),
    module: {
        rules: [{
            exclude: path.resolve(__dirname, 'node_modules'),
            loader: 'babel-loader',
            test: /\.js$/
        }, {
            test: /\.css$/,
            use: [
                { loader: 'style-loader' },
                { loader: 'css-loader' }
            ]
        }]
    },
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'public')
    }
};

