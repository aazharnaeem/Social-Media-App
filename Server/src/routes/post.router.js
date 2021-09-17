const router = require('express').Router()

const {postControls } = require('../controllers')



router.route('/add/:id').post(postControls.createPost)

router.route('/remove/:id').delete(postControls.removePost)

router.route('/update/:id').patch(postControls.updatePost)


module.exports = router