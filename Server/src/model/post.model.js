const mongoose = require('mongoose')

const schema = mongoose.Schema


const postSchema = new schema({
    content: {
        type: String,
        required: true
    },
    isPrivate: {
        type: Boolean,

    },
    user: {
        type: schema.Types.ObjectId,
        ref: 'user'
    },
    // comments: [
    //     {
    //         type: schema.Types.ObjectId,
    //         ref: 'comment'
    //     }
    // ],
    // likes: [
    //     {
    //         type: schema.Types.ObjectId,
    //         ref: 'like'
    //     }
    // ]
}, {
    timestamps: true
})

const post = mongoose.model('post', postSchema)
module.exports = post