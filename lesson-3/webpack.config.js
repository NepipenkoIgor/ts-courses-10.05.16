module.exports = {
    entry: './lesson-3/scripts/main.ts',
    output: {
        path:'./lesson-3/',
        filename: './bundle.js'
    },
    resolve: {
        extensions: ['',  '.ts']
    },
    devtool: 'source-map',
    module: {
        loaders: [
            { test: /\.ts$/, loader: 'ts-loader' }
        ]
    }
};