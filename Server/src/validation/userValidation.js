const { validationResult, check } = require('express-validator');
const { user } = require('../model')

const userValidation = () => {
    return [
        check("password", "Password must 8 letters containing one capital and a number ")
            .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}/, "i")
    ]
}

module.exports = {
    userValidation
}