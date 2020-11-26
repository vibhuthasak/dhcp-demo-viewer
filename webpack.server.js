const path = require("path")
const webpack = require("webpack")
const CleanWebpackPlugin = require("clean-webpack-plugin")
const nodeExternals = require("webpack-node-externals")
const NodemonPlugin = require("nodemon-webpack-plugin")

const publicPath = path.join(__dirname, "public")
const serverPath = path.join(__dirname, "dist")
const srcPath = path.join(__dirname, "src")

const configs = {
    mode: "development",
    name: "server",
    entry: srcPath+"/server/server.js",
    target: "node",
    output: {
        path: serverPath,
        filename: "server.generated.js",
        libraryTarget: "commonjs2"
    },
    watchOptions: {
        ignored: /node_modules/
    },
    externals: [nodeExternals()],
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: "babel-loader",
                options: {
                    presets: [
                        ["@babel/preset-env", {
                            targets: {
                                node: "9.5"
                            }
                        }]
                    ],
                    plugins: ["@babel/plugin-proposal-object-rest-spread", "@babel/plugin-proposal-class-properties"]
                },
                exclude: [/node_modules/]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(["./dist/*"]),
        new NodemonPlugin({
            nodeArgs: ["--inspect=0.0.0.0:1609"]
        })
    ]
}

module.exports = {
    ...configs
}
