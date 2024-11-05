/// Clears the session and associated cookie data
const logout = async (req, res) =>{
    try {
        req.session.destroy(err => {
            if (err) {
                res.status(500).json({ success: false, message: 'Logout failed : ', error: err.message });
            }
        })
        res.clearCookie('connect.sid');
        res.status(200).json({success: true,message: 'Logout successful '});
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Logout failed : ', error: error.message });
    }
}

module.exports = { logout };