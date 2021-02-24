module.exports = {
    devtool: 'source-map',
    output: {
        filename: 'app.js'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                options: {
                    presets: ['@babel/preset-env', '@babel/preset-react']
                }
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loader: 'file-loader',
                options: {
                    name: '/public/icons/[name].[ext]'
                }
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx']
    }
};
