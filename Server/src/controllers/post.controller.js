const { post, user } = require('../model')

module.exports = {
    async createPost(req, res) {
        try {
            const id = req.params.id //userID
            const { content, isPrivate } = req.body

            const newPost = new post({
                content: content,
                isPrivate: isPrivate,
                user: id,
            })

            newPost.save()
            res.status(200).json({ message: 'post created sucessfully', sucessful: true })
        }
        catch (error) {
            res.status(400).json({ error: error, sucessful: false })

        }
    },

    async removePost(req, res) {
        try {
            const id = req.params.id // post ID

            // const { postId } = req.body

            const Post = await post.findById(id)
            //ERROE SOMEWHERE 
            if (Post.length <= 0) {
                throw new Error('error somthing went wrong...')
            }
            const rem = await post.deleteOne({ _id: id })
            
            rem.save()

            res.status(200).json({ message: 'post removed sucessfully', sucessful: true })
        }
        catch (error) {
            res.status(400).json({ error: error, sucessful: false })

        }
    },
    async updatePost(req, res) {
        try {
            const id = req.params.id //postID
            const { content, isPrivate } = req.body
            const expost = await post.updateOne({ _id: id }, { $set: { content: content, isPrivate: isPrivate } })

            expost.save()

            res.status(200).send({ message: 'Post updated Sucessfully' })
        }
        catch (error) {
            res.status(400).json({ error: 'somthing went wrong try again' })
        }
    }
}