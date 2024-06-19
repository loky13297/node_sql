const express = require("express")
const { createUser, userLogin } = require("../controller/user.controller")

let userRouter = express.Router()

userRouter.post("/createUser", createUser)
userRouter.post("/userLogin", userLogin)

module.exports = userRouter