const Post = require('../Models/Post.model');

module.exports = {
    all: async (req, res) => {
        try {
            const posts = await Post.find({}).sort({ date: -1 });;
            res.status(200).json({
                status: true,
                msg: 'Success',
                'posts': posts
            });
        } catch (error) {
            res.json({
                message: error
            })
        }
    },
    save: async (req, res) => {
        //console.log(req.body)
        const post = new Post({
            title: req.body.title,
            description: req.body.description,
        });
        try {
            const savePost = await post.save();
            res.status(200).json({
                status: true,
                msg: 'Save success',
            });
        } catch (error) {
            res.json({
                message: error
            })
        }
    },
    getPostById: async (req, res) => {
        try {
            const post = await Post.findById(req.params.postId);
            res.status(200).json({
                status: true,
                msg: 'Get Post success',
                post: post
            });
        } catch (error) {
            res.json({
                message: error
            })
        }
    },
    deletePostById: async (req, res) => {
        try {
            const remove = await Post.remove({
                _id: req.params.postId
            });
            res.status(200).json({
                status: true,
                msg: 'Remove success',
                post: remove
            });
        } catch (error) {
            res.json({
                message: error
            })
        }
    },
    updatePostById: async (req, res) => {
        try {
            const update = await Post.updateOne(
                {
                    _id: req.params.postId
                },
                {
                    $set: {
                        title: req.body.title,
                        description: req.body.description,
                    }
                }
            );
            res.status(200).json({
                status: true,
                msg: 'Update success',
                post: update
            });
        } catch (error) {
            res.json({
                message: error
            })
        }
    }
}