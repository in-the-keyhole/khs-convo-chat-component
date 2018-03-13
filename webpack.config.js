var path = require('path');

module.exports = {
    entry: path.resolve(__dirname, 'src', 'components', 'webconvo', 'webconvo.js'),
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
        filename: 'bundle.js',
        libraryTarget: 'umd',
        path: path.resolve(__dirname, 'dist')
    }
};

