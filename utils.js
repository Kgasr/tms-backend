const jwt = require('jsonwebtoken')
const SECRET_KEY = 'testing'


const authMiddleWare = (req, res, next) => {
    try {
        if (req.session && req.session.sessionInfo && req.session.sessionInfo.userId) {
            next();
        }
        else {
            return res.status(400).json({ message: "Invalid Session :" });
        }
    }
    catch (err) {
        return res.status(400).json({ message: "Invalid Session :" + err.message });
    }
}

const setCookies = (req, res, data) => {
    try {
        if (data) {
            const token = jwt.sign({ user: data.userId, role: data.roleId }, SECRET_KEY, { expiresIn: '2h' })
            setCookie(res, 'session_token', token)
        }
        else {
            return res.status(500).json({ message: "Error in setting cookies" });
        }
    }
    catch (err) {
        return res.status(500).json({ message: "Error in setting cookies : " + err.message });
    }
}

const setCookie = (res, name, value) => {
    res.cookie(name, value, {
        httponly: true,
        secure: false,
        maxAge: 360000,
    })
}

module.exports = { authMiddleWare };
