const jwt = require('jsonwebtoken');

function auth(req, res, next) {
    const authHeader = req.headers.authorization;

    if(!authHeader) {
        return res.status(401).json({ message: 'No token provided '});
    }

    const [scheme, token] = authHeader.split(' ');

    if(scheme !== 'Bearer' || !token) {
        return res.status(401).json({ message: 'Invalid authorization header format' });
    }

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.user = { id: payload.userId };
        next();
    } catch (err) {
        console.error('JWT verify error:', err);
        return res.status(401).json({ message: 'Invalid or expired token' });
    }
}

module.exports = auth;