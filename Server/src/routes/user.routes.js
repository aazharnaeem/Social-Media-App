const router = require('express').Router()
const { userControls } = require('../controllers');

router.route('/signup')
    .post(userControls.signup);

router.route('/login')
    .post(userControls.login);

router.route('/updatePass/:id')
    .patch(userControls.updatePassword);

router.route('/updateName/:id')
    .patch(userControls.updateInfo);

router.route('/removeAccount/:id')
    .delete(userControls.deleteAccount);

router.route('/sendRequest/:id')
    .post(userControls.addFriend);

router.route('/confirmRequest/:id')
    .post(userControls.confirmRequest);

router.route('/getRequests/:id')
    .get(userControls.getRequests)

router.route('/unfriend/:id')
    .patch(userControls.unfriend);

router.route('/blockUser/:id')
    .patch(userControls.blockUser);

router.route('/unblock/:id')
    .patch(userControls.unblockUser);

router.route('/getAll/:id')
    .get(userControls.getAllUsers)

// router.route('/addPost/:id')
//     .post(postControls.createPost)

// router.route('/removePost/:id')
//     .delete(postControls.removePost)

module.exports = router