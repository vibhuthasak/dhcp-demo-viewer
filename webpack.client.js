const path = require("path")
const webpack = require("webpack")
const CleanWebpackPlugin = require("clean-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const autoprefixer = require("autoprefixer")

const publicPath = path.join(__dirname, "public")
const srcPath = path.join(__dirname, "src")

const cssRule =  {
    test: /\.css$/,
    use: [
        {
            loader: MiniCssExtractPlugin.loader,
            options: {
                publicPath
            }
        },
        {
            loader: "css-loader",
            options: {
                modules: true,
                sourceMap: true,
                localIdentName: "[path][name]__[local]--[hash:base64:5]"
            }
        }
    ]
}

const scssRule =  {
    test: /\.scss$/,
    use: [{
        loader: MiniCssExtractPlugin.loader,
        options: {
            publicPath
        }
    }, {
        loader: "css-loader",
        options: {
            modules: true,
            sourceMap: true,
            localIdentName: "[path][name]__[local]--[hash:base64:5]"
        }
    }, "postcss-loader", "sass-loader"]
}

const sassRule =  {
    test: /\.sass$/,
    use: [{
        loader: MiniCssExtractPlugin.loader,
        options: {
            publicPath
        }
    }, {
        loader: "css-loader",
        options: {
            modules: true,
            sourceMap: true,
            localIdentName: "[path][name]__[local]--[hash:base64:5]"
        }
    }, "postcss-loader", "sass-loader"]
}

const lessRule =  {
    test: /\.less$/,
    use: [
        { loader: MiniCssExtractPlugin.loader, options: { publicPath }},
        { loader: "css-loader", options: { importLoaders: 1 }},
        { loader: "less-loader", options: { javascriptEnabled: true }}
    ]
}

const configs = {
    mode: "development",
    name: "browser",
    entry: srcPath + "/client/index.js",
    output: {
        path: publicPath,
        filename: "[name].bundle.js"
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                styles: {
                    name: "main",
                    test: /\.css$/,
                    chunks: "all",
                    enforce: true
                }
            }
        }
    },
    watchOptions: {
        ignored: /node_modules/
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                loader: "babel-loader",
                include: [
                    path.join(__dirname, "src"),
                    path.join(__dirname, "node_modules")
                ],
                options: {
                    cacheDirectory: true,
                    presets: [
                        ["@babel/preset-env", {
                            "targets": {
                                "browsers": "last 2 Chrome versions"
                            }
                        }],
                        "@babel/preset-react"
                    ],
                    plugins: [
                        "@babel/plugin-proposal-object-rest-spread",
                        "@babel/plugin-proposal-class-properties",
                        ["import", { "libraryName": "antd", "libraryDirectory": "es", "style": "css" }] // `style: true` for less
                    ]
                }
            },
            cssRule,
            sassRule,
            scssRule,
            lessRule,
            {
                test: /\.woff[2]?$/,
                loader: "file-loader?mimetype=application/font-woff",
                options: {
                    publicPath: "./"
                }
            }
        ]
    },
    // devServer: {
    //     contentBase: path.join(__dirname, "public"),
	// 	publicPath: '/',
    //     port: "80",
	// 	watchContentBase: true
    // },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "main.css"
        }),
        new webpack.LoaderOptionsPlugin({
            options: {
                postcss: [
                    autoprefixer()
                ]
            }
        }),
        new CleanWebpackPlugin(["./public/*.js", "./public/*.json", "./public/styles.css", "./public/*.woff", "./public/*.woff2"])
    ]
}

module.exports = { ...configs }
