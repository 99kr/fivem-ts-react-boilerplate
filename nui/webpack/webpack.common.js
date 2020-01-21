const path = require('path');
const webpack = require('webpack');

module.exports = options => ({
    mode: options.mode,
    entry: options.entry,
    output: {
        path: path.resolve(process.cwd(), 'build'),
        filename: '[name].js',
    },
    module: {
        rules: [
        {
            test: /\.jsx?$/, // Transform all .js and .jsx files required somewhere with Babel
            use: {
                loader: 'babel-loader',
            },
        },
        {
            test: /\.tsx?$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
            },
        },
        {
            // Preprocess our own .css files
            // This is the place to add your own loaders (e.g. sass/less etc.)
            // for a list of loaders, see https://webpack.js.org/loaders/#styling
            test: /\.css$/,
            exclude: /node_modules/,
            use: ['style-loader', 'css-loader'],
        },
        {
            test: /\.(eot|otf|ttf|woff|woff2)$/,
            exclude: /node_modules/,
            use: 'file-loader',
        },
        {
            test: /\.svg$/,
            exclude: /node_modules/,
            use: [
                {
                    loader: 'svg-url-loader',
                    options: {
                    // Inline files smaller than 10 kB
                    limit: 10 * 1024,
                    noquotes: true,
                    },
                },
            ],
        },
        {
            test: /\.(jpg|png|gif)$/,
            exclude: /node_modules/,
            use: [
            {
                loader: 'url-loader',
                options: {
                // Inline files smaller than 10 kB
                limit: 10 * 1024,
                },
            },
            {
                loader: 'image-webpack-loader',
                options: {
                mozjpeg: {
                    enabled: false,
                    // NOTE: mozjpeg is disabled as it causes errors in some Linux environments
                    // Try enabling it in your environment by switching the config to:
                    // enabled: true,
                    // progressive: true,
                },
                gifsicle: {
                    interlaced: false,
                },
                optipng: {
                    optimizationLevel: 7,
                },
                pngquant: {
                    quality: '65-90',
                    speed: 4,
                },
                },
            },
            ],
        },
        {
            test: /\.html$/,
            exclude: /node_modules/,
            use: 'html-loader',
        },
        {
            test: /\.(mp4|webm)$/,
            exclude: /node_modules/,
            use: {
                loader: 'url-loader',
                options: {
                    limit: 10000,
                },
            },
        },
        {
            test: /\.js$/,
            exclude: /node_modules/,
            use: [
                {
                    loader: `ifdef-loader`,
                    options: {
                    DEBUG: options.mode !== 'production',
                    version: 3,
                    'ifdef-verbose': true, // add this for verbose output
                    'ifdef-triple-slash': true, // add this to use double slash comment instead of default triple slash
                    },
                },
            ],
        },
        ],
    },
    plugins: options.plugins.concat([
        // Always expose NODE_ENV to webpack, in order to use `process.env.NODE_ENV`
        // inside your code for any environment checks; Terser will automatically
        // drop any unreachable code.
        new webpack.EnvironmentPlugin({
            NODE_ENV: 'development',
        }),
    ]),
    devServer: {
        historyApiFallback: true
    },
    resolve: {
        modules: ['src', 'node_modules'],
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.react.js'],
    },
});
