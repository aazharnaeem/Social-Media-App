const { user } = require('../model')
// const { validationResult } = require('express-validator');

module.exports = {
    async signup(req, res) {
        try {
            const { firstName, lastName, userName, password, email, confirmPassword } = req.body

            if (password !== confirmPassword) {
                res.status(400).send({
                    message: 'password confirmation Failed'
                })
                return;
            }
            const exUser = await user.findOne({ userName: userName })

            if (exUser) {
                res.status(400).send({
                    error: 'username already taken'
                })
                return;
            }


            const newUser = new user({
                firstName: firstName,
                lastName: lastName,
                userName: userName,
                password: password,
                email: email
            })

            newUser.save()
            res.status(200).send({ message: 'account created', sucessful: true })
        }
        catch (error) {
            res.status(400).send({ error: error, sucessful: false })
        }
    }
    ,
    async login(req, res) {
        try {
            const { userName, password } = req.body

            if (userName === "" || password === "") {
                res.status(400).send({ error: `userName/password can't be empty`, sucessful: false })
                return;
            }

            const User = await user
                .findOne({ userName: userName, password: password }).select(['-password'])
            if (!User) {
                res.status(400).send({ error: 'Incorrect username/Password', sucessful: false })
                return;
            }
            res.send({ User, isLogedIn: true })
        }
        catch (error) {
            res.status(00).json({ error: 'Somthing went wrong...', sucessful: false })
        }
    }
    ,
    async updatePassword(req, res) {
        //Password confirmation remaining!!!s
        try {
            const id = req.params.id
            const { password } = req.body
            const exUser = await user.findById(id)

            if (!exUser) {
                throw new Error('no such User')
            }
            const newUser = await user.updateOne({ _id: id }, { $set: { password: password } })
            newUser.save()
            res.status(200).json({ message: 'updated password sucessfully', sucessful: true })

        }
        catch (error) {
            res.status(400).json({ error: error, sucessful: false })
        }
    }
    ,
    async updateInfo(req, res) {
        //Password confirmation remaining
        try {
            // const errors = validationResult(req);
            // if (!errors.isEmpty()) {
            //     return res.status(400).json({ error: errors.array() })
            // }
            const id = req.params.id
            const { firstName, lastName } = req.body
            const exUser = await user.findById(id)

            if (!exUser) {
                throw new Error('no such User')
            }

            const newUser = await user.updateOne({ _id: id }, { $set: { firstName: firstName, lastName: lastName } })

            newUser.save()
            res.status(200).json({ message: 'Updated sucessfully', sucessful: true })

        }
        catch (error) {
            res.status(400).json({ error: error, sucessful: false })
        }
    }
    ,
    async deleteAccount(req, res) {
        try {
            // const errors = validationResult(req);
            // if (!errors.isEmpty()) {
            //     return res.status(400).json({ error: errors.array() })
            // }
            const id = req.params.id
            const exUser = await user.findById(id)
            if (!exUser) {
                throw new Error('no such User')
            }
            const rem = await user.deleteOne({ _id: id })
            res.status(200).json({ message: 'account removed sucessfully', sucessful: true })

        }
        catch (error) {
            res.status(400).json({ error: error, sucessful: false })
        }

    }
    ,
    async addFriend(req, res) {
        try {
            const id = req.params.id //sender
            const { recieverId } = req.body
            const reciever = await user.findOne({ _id: recieverId })

            reciever.requests = [...reciever.requests, id]
            reciever.save()

            // res.send('req sent')
            res.status(200).json({ message: 'request sent sucessfully', sucessful: true })


        }
        catch (error) {
            res.status(400).json({ error: error, sucessful: false })
        }
    }
    ,
    async confirmRequest(req, res) {
        try {
            const id = req.params.id // reciever
            const { senderId, confirm } = req.body

            const reciever = await user.findOne({ _id: id })
            const sender = await user.findOne({ _id: senderId })

            if (!confirm) {
                reciever.requests = reciever.requests.filter(requests => requests !== senderId)

                reciever.save()
                res.status(200).json({ message: 'request deleted sucessfully', sucessful: false })
            }
            else {
                reciever.requests = reciever.requests.filter(requests => requests !== senderId)
                reciever.friends = [...reciever.friends, senderId]
                sender.friends = [...sender.friends, id]
                reciever.save()
                sender.save()
                res.status(200).json({ message: 'added friend sucessfully', sucessful: true })

            }
        }
        catch (error) {
            res.status(400).json({ error: error })
        }
    }
    ,
    async getRequests(req, res) {
        try {
            const id = req.params.id;

            const exUser = await user.findById(id);
            if (!exUser) {
                res.status(400).send({ error: 'no such user' })
                return;
            }

            const requests = exUser.requests

            const reqUsers = await user.find({ _id: { $in: requests } })
                .select(['-password', '-friends', '-requests', '-blocked', '-blockedBy'])

            if (reqUsers.length <= 0) {
                // res.status(200).send({ message: 'no request' })
                return
            }

            res.status(200).send(reqUsers)

        }
        catch (error) {
            res.status(400).json({ error: 'somthing went wrong' })


        }
    }
    ,
    async unfriend(req, res) {
        try {
            const id = req.params.id
            const { userId } = req.body

            const mainUser = await user.findOne({ _id: id })

            if (!mainUser) {
                res.status(400).json({ error: 'no such friend', sucessful: false })
            }

            mainUser.friends = mainUser.friends.filter(frnds => frnds !== userId);
            mainUser.save()
            res.status(200).json({ message: 'removed friend sucessfully', sucessful: true })

        }
        catch (error) {
            res.status(400).json({ error: error, sucessful: false })
        }
    }
    ,
    async blockUser(req, res) {
        try {
            const id = req.params.id // User
            const { userId } = req.body //to be blocked

            const exUser = await user.findById(id)
            const blockUser = await user.findById(userId)

            const alreadyblocked = exUser.blocked.filter(usrs => usrs === userId)

            if (alreadyblocked.length > 0) {
                res.status(400).json({ message: 'user already blocked', sucessful: false })
            }

            const exUserBlocked = blockUser.blocked.filter(usrs => usrs === id)
            if (exUserBlocked.length > 0) {
                res.status(400).json({ message: 'already blocked by other user', sucessful: false })
            }

            exUser.friends = exUser.friends.filter(frnds => frnds !== userId)
            exUser.requests = exUser.requests.filter(reqs => reqs !== userId)

            exUser.blocked = [...exUser.blocked, userId]

            blockUser.friends = blockUser.friends.filter(frnds => frnds !== id)
            blockUser.requests = blockUser.requests.filter(reqs => reqs !== id)

            blockUser.blockedBy = [...blockUser.blockedBy, id]
            exUser.save()
            blockUser.save()

            res.status(200).josn({ message: 'blocked user sucessfully', sucessful: true })

        }
        catch (error) {
            res.status(400).json({ error: error, sucessful: false })
        }
    }
    ,
    async unblockUser(req, res) {
        try {
            const id = req.params.id
            const { userId } = req.body

            const exUser = await user.findById(id)
            const unUser = await user.findById(userId)

            exUser.blocked = exUser.blocked.filter(usrs => usrs !== userId)
            unUser.blockedBy = unUser.blockedBy.filter(usrs => usrs !== id)
            exUser.save()
            unUser.save()

            res.status(400).json({ message: 'user unblocked sucessfully', sucessful: true })


        }
        catch (error) {
            res.status(400).json({ error: error, sucessful: false })
        }
    },

    async getAllUsers(req, res) {
        try {
            const id = req.params.id
            const users = await user.find({ _id: { $ne: id } })
                .select(['-password', '-friends', '-requests', '-blockedBy', '-blocked'])

            if (users.length <= 0) {
                res.send('error')
            }

            res.send(users)
        }
        catch (error) {
            res.status(400).json({ error: error, sucessful: false })
        }

    }



}