const jwt = require('jsonwebtoken')

function verifyToken(req, res, next) {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'No token provided' })
    }

    const token = authHeader.split(' ')[1]

    try {
        const decoded = jwt.verify(token, process.env.SEC_KEY)
        req.user = decoded // attach decoded payload to request
        next() // continue to next middleware or route handler
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ error: 'Token expired' })
        }
        return res.status(401).json({ error: 'Invalid token' })
    }
}

module.exports = verifyToken
