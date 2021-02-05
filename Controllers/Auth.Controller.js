const User = require('../Models/User.model')
const { registerValidation, loginValidation } = require('../helpers/validation')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
    register: async (req, res) => {
        const error = registerValidation(req.body);
        if (error) return res.status(400).send({ msg: error.details[0].message });
        const mobileExist = await User.findOne({
            mobile: req.body.mobile
        });
        if (mobileExist) return res.status(400).send({
            mgs: mobileExist.mobile + ' is exist in database'
        })
        //const salt = await bcrypt.genSalt(10);
        //const hashedPassword = await bcrypt.hash(req.body.password, salt)

        const user = new User({
            name: req.body.name,
            mobile: req.body.mobile,
            areaId: req.body.areaId,
            address: req.body.address,
            nid: req.body.nid,
            location: req.body.location,
            latitude: req.body.latitude ? req.body.latitude : 0,
            longitude: req.body.longitude ? req.body.longitude : 0,
            otp: req.body.otp ? req.body.otp : '',
            fcm_token: req.body.fcm_token ? req.body.fcm_token : '',
            image: req.body.image ? req.body.image : '',
        });
        try {
            const savedUser = await user.save();
            res.status(200).json({
                status: true,
                msg: 'Reg. success',
                user: savedUser
            });
        } catch (error) {
            res.status(400).send(error)
        }
    },

    login: async (req, res) => {
        const error = loginValidation(req.body);
        if (error) return res.status(400).send({ msg: error.details[0].message });
        const userExist = await User.findOne({
            mobile: req.body.mobile
        });
        if (!userExist) return res.status(400).send({
            mgs: ' Mobile# is not found '
        })
        //const validPassword = await bcrypt.compare(req.body.password, userExist.password);
        //if (!validPassword) return res.status(400).send({
        // mgs: ' Invalid password'
        //})
        await User.updateOne(
            {
                mobile: req.body.mobile
            },
            {
                $set: {
                    otp: Math.floor(1000 + Math.random() * 9000),
                }
            }
        );
        const user = await User.findOne({
            mobile: req.body.mobile
        });

        jwt.sign({
            //from now 60 minutes valid
            exp: Math.floor(Date.now() / 1000) + (60 * 60),
            _id: userExist._id
        }, process.env.TOKEN_SECRET, { algorithm: 'HS256' }, function (err, token) {
            res.header('auth-token', token).send({
                'status': true,
                'msg': 'Logged In success',
                'auth-token': token,
                'exp': Math.floor(Date.now() / 1000) + (60 * 60),
                'user': user
            });
        });
    },
    logout: async (req, res) => {
        try {
            const authHeader = req.header('auth-token')
            if (!authHeader)
                return res.status(401).send('Access denied')
            const userExist = await User.findOne({
                email: req.body.email
            });
            if (!userExist) return res.status(400).send({
                mgs: ' Email is not found '
            })
            try {
                res.status(200).send({
                    status: true,
                    msg: 'Token only an one hour',
                });
            } catch (error) {
                res.status(400).send(error)
            }
        } catch (error) {
            next(error)
        }
    },
}