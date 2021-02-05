const express = require('express');
const router = express.Router();
const verify = require('../helpers/verifyToken')
const PostController = require('../Controllers/Post.Controller')

//GET BACK ALL THE POST
router.get('/all', verify, PostController.all)
//SUBMIT A POST
router.post('/save', verify, PostController.save)
//GET BACK A SPECIFIC POST USING POST ID
router.get('/:postId', verify, PostController.getPostById)
//DELETE A SPECIFIC POST
router.delete('/:postId', verify, PostController.deletePostById);
//UPDATE A SPECIFIC POST
router.patch('/:postId', verify, PostController.updatePostById);

module.exports = router;
