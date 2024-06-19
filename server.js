const sequelize = require('./config');
const express = require("express");
const userRouter = require('./routes/user.routes');
require("dotenv").config()

const app = express();

app.use(express.json())


sequelize
    .authenticate()
    .then(() => {
        app.use("/v1/user",userRouter)
        console.log('Connection has been established successfully.');
    })
    .catch((err) => {
        console.error('Unable to connect to the database:', err);
    });
app.listen(4041, () => {
    console.log(`listering to the port ${4041}`)
})