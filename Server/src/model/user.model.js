const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema({

    firstName: {
        type: String,
        required: true,
        min: 3,
        max: 12,
    },
    lastName: {
        type: String,
        required: true,
        min: 3,
        max: 12,
    },
    userName: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        min: 8,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        unique: true,
    }
    ,
    friends: [
        {
            type: String
        }
    ],
    requests: [
        {
            type: String
        }
    ],
    blocked: [
        {
            type: String
        }
    ]
    ,
    blockedBy: [
        {
            type: String
        }
    ]
    ,
    // posts: [
    //     {
    //         type: Schema.Types.ObjectId,
    //         ref:'post'

    //     }
    // ]
},
    {
        timestamps: true,
    })


const user = mongoose.model('user', userSchema)

module.exports = user