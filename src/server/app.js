import express from "express"
import path from "path"
const app = express()

/**
 * Client
 */
app.use("/", express.static("public"))

export default app
