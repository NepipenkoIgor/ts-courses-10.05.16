module.exports = {
    entry: './lesson-3/class-work/scripts/main.ts',
    output: {
        path:'./lesson-3/class-work/',
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