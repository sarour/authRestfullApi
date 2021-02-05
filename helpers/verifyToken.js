const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    const authHeader = req.header('auth-token')
    if (!authHeader)
        return res.status(401).send('Access denied')

    try {
        //console.log('this token.....', authHeader);
        jwt.verify(authHeader, process.env.TOKEN_SECRET, function (error, decoded) {
            if (error) {
                return res.json({ success: false, message: 'Failed to authenticate token.' });
            } else {
                req.user = decoded;
                next();
            }
        });
        //const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        //req.user = verified;
        //next()
    } catch (error) {
        //console.log(error)
        res.status(400).send('Invalid Token')
    }
}