const { loginToken } = require("../middleware/authentication");
const { textEncryption, compareEncryptedText } = require("../middleware/textEncrypt");
const User = require("../model/user.modal");
const { HTTP_CODE, CONSTANTS_TEXT } = require("../utils/constant")
const { Op } = require('sequelize');

const createUserService = async (req) => {
    try {
        const isUserExist = await User.findOne({
            where: {
                [Op.or]: [
                    { mobileNumber: req.body.mobileNumber },
                    { email: req.body.email }
                ]
            }
        })
        if (isUserExist) {
            return {
                error: true,
                status: HTTP_CODE.BAD_REQUEST,
                message: CONSTANTS_TEXT.USER_EXIST,
                data: {}
            }
        }
        if (req.body.password === req.body.confirmPassword) {
            req.body.password = await textEncryption(req.body.password)
            req.body.confirmPassword = await textEncryption(req.body.confirmPassword)

            await User.create(req.body);

            return {
                error: false,
                status: HTTP_CODE.SUCCESS,
                message: CONSTANTS_TEXT.CREATE_USER,
                data: {}
            }
        } else {
            return {
                error: true,
                status: HTTP_CODE.BAD_REQUEST,
                message: "Password and confirm password does not match",
                data: {}
            }
        }
    } catch (err) {
        return {
            error: true,
            status: HTTP_CODE.BAD_REQUEST,
            message: CONSTANTS_TEXT.ERROR,
            data: err
        }
    }
}

const loginService = async (req) => {
    try {
        const user = await User.findOne({
            where: {
                [Op.or]: [
                    { email: req.body.email || "" },
                    { mobileNumber: req.body.mobileNumber || "" }
                ]
            }
        })
        let isPassValid = await compareEncryptedText(req.body.password, user.password)
        if (user && isPassValid) {
            let obj={}
            obj.name = user.firstName;
            obj.email = user.email;
            obj.mobileNumber = user.mobileNumber;
            obj.token=loginToken(user)
            return {
                error: false,
                status: HTTP_CODE.SUCCESS,
                message: CONSTANTS_TEXT.LOGIN_SUCCESS,
                data: obj
            }
        } else {
            return {
                error: true,
                status: HTTP_CODE.BAD_REQUEST,
                message: CONSTANTS_TEXT.INVALID_PASSWORD,
                data: {}
            }
        }
    } catch (err) {
        return {
            error: true,
            status: HTTP_CODE.BAD_REQUEST,
            message: CONSTANTS_TEXT.ERROR,
            data: {}
        }
    }
}

module.exports = {
    createUserService,
    loginService
}