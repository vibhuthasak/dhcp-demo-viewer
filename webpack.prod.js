const path = require("path")
const webpack = require("webpack")
const merge = require("webpack-merge")
const client = require("./webpack.client.js")
const server = require("./webpack.server.js")
const UglifyJSPlugin = require("uglifyjs-webpack-plugin")
const ReplaceInFileWebpackPlugin = require("replace-in-file-webpack-plugin")

const publicPath = path.join(__dirname, "public")

const serverPlugins = [
    new webpack.DefinePlugin({
        "process.env.NODE_ENV": JSON.stringify("production")
    })
]

const clientPlugins = [
    new webpack.DefinePlugin({
        "process.env.NODE_ENV": JSON.stringify("production")
    }),
    new ReplaceInFileWebpackPlugin([
        {
            dir: publicPath,
            files: ["index.html"],
            rules: [
                {
                    search: "#version",
                    replace: (process.env.npm_package_version !== "") ?
                        `${process.env.npm_package_version}+build.${Number(new Date())}` : Number(new Date())
                }
            ]
        }
    ])
]

module.exports = merge.multiple({
    client,
    server
}, {
    server: {
        mode: "production",
        plugins: serverPlugins
    },
    client: {
        mode: "production",
        plugins: clientPlugins
    }
})
